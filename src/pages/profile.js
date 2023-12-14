import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import UserProfileCard from "@/app/components/UserProfileCard";
import {getDocs, query, collection, getFirestore, where} from "firebase/firestore";


export default function UserProfile({isLoggedIn, loginInformation}) {
    const router = useRouter();
    const [user, setUser] = useState({}); 
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
        if(loginInformation) {
            getUser();
        }


}, [loginInformation]);
      
    return (
        <main>
            <UserProfileCard user={user} loginInformation={loginInformation}/>
        </main>
    );
};