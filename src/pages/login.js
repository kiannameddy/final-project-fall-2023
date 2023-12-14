import {useEffect} from "react"
import {useRouter} from "next/router";
import LoginForm from "@/app/components/LoginForm";

export default function Login({isLoggedIn, loginUser}) {
    // if user is logged in, forward them to the profile page 
    const router = useRouter();
    useEffect(() => {
        if(isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    return (
        <main>
            <LoginForm loginUser={loginUser}/>
        </main>
    );
};