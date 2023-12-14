import {useCallback, useEffect} from "react"
import {useRouter} from "next/router";
import CreatePostForm from "@/app/components/CreatePostForm";
import {getFirestore, addDoc, collection} from "firebase/firestore";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";


export default function CreatePost({isLoggedIn, loginInformation}) {
    // if user is not logged in, send them to login 
    const router = useRouter();
    useEffect(() => {
        if(!isLoggedIn) router.push("/");
    }, [isLoggedIn]);

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
        const userId = loginInformation.uid;
        //Send Post to firebase with addDoc
        const data = await addDoc(collection(db, "posts" ), {
            postContent: postContent, 
            userId: userId,
            imageURL: imageURL || ' ',
        });
        //Re-route the use away from createPost
        if(data) {
            router.push("/");
        }
        },
        [addDoc, collection, getFirestore, router, loginInformation]
    );


    return (
        <main>
            <CreatePostForm  createPostFunction={createPostFunction}/>
        </main>
    );
};