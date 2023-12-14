import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import UserProfileCard from "@/app/components/UserProfileCard";
import {getDocs, query, collection, getFirestore, where} from "firebase/firestore";
import PostCard from "@/app/components/PostCard";


export default function UserProfile({isLoggedIn, loginInformation}) {
    const router = useRouter();
    const [user, setUser] = useState({}); 
    const [posts, setPosts] = useState([]);

    //if user is not logged in, send them to logine page 
    useEffect(() => {
        if(!isLoggedIn) router.push("/login");
    }, [isLoggedIn]);

    // Get user to display 
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

        //Get user posts to display
        async function getUserPosts() {
        const posts = [];
        const db = getFirestore();
        const q = query(
            collection(db, "posts"),
            where("userId", "==", loginInformation?.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((post) => {
            posts.push(post.data());
        });
        setPosts(posts);
    }

    if (loginInformation) {
        getUser();
        getUserPosts();
    }
}, [loginInformation]);

    return (
        <main>
            <UserProfileCard user={user} loginInformation={loginInformation}/>
            {posts.map((post, i) => (
                <PostCard key={i} post={post} />
            ))}
        </main>
    );
};