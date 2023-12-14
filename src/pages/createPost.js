import {useCallback, useEffect, useState} from "react"
import {useRouter} from "next/router";
import CreatePostForm from "@/app/components/CreatePostForm";
import {getFirestore, addDoc, collection, query, where, getDocs} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


export default function CreatePost({isLoggedIn, loginInformation}) {
    // if user is not logged in, send them to login 
    const router = useRouter();
    const [user, setUser] = useState({});

    useEffect(() => {
        if(!isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    useEffect(() => {
     async function getUser() {
            let user = {};
            const db = getFirestore();
            const q = query(
                collection(db, "users"),
                where("userId", "==", loginInformation?.uid)
            );
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                user = doc.data();
            });
            setUser(user);
        }
        getUser();
    }, []);

    // Create function to create a post
    const createPostFunction = useCallback(
        async (e, imageUpload) => {
        e.preventDefault();
        //Instantiate firebase
        const storage = getStorage();
        const db = getFirestore();
        // Get post content from form 
        const postContent = e.currentTarget.postContent.value;
        // variable for image
        let imageURL;
        const storageRef = ref(storage, imageUpload?.name);
// maybe remove if statement
        if(imageUpload) {
        await uploadBytes(storageRef, imageUpload)
            .then(async (snapshot) => {
                await getDownloadURL(snapshot.ref)
                    .then((url) => {
                        imageURL = url;
                    });
                    })
                    .catch((error) => {
                        console.warn(error);
                    });
        }
        // Get User Information to link post to user
        const userId = loginInformation?.uid;
        //Send Post to firebase with addDoc
        const data = await addDoc(collection(db, "posts" ), {
            postContent: postContent, 
            userId: userId,
            imageURL: imageURL || ' ',
            username: user?.username || "", 
        });
        //Re-route the use away from createPost
        if(data) {
            router.push("/");
        }
        },
        [addDoc, collection, getFirestore, router, loginInformation, user]
    );


    return (
        <main>
            <CreatePostForm  createPostFunction={createPostFunction}/>
        </main>
    );
};