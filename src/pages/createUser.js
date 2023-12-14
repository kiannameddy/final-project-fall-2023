import {useEffect} from "react"
import {useRouter} from "next/router";
import CreateUserForm from "@/app/components/CreateUserForm";

export default function CreateUser({createUser, isLoggedIn, }) {
    // if user is logged in, forward them to the profile page 
    const router = useRouter();
    useEffect(() => {
        if(isLoggedIn) router.push("/");
    }, [isLoggedIn]);

    return (
        <main>
            <CreateUserForm createUser={createUser} />
        </main>
    );
};