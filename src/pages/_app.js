import {useEffect, useState, useCallback} from "react";
import { initializeApp } from "firebase/app";
import {
    getAuth, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut
} from "firebase/auth";
import Header from "@/app/components/Header";
import firebaseConfig from "@/app/components/firebaseConfig";
import { collection, getFirestore, addDoc } from "firebase/firestore";


export default function MyApp({Component, pageProps}){
    const [appInitialized, setAppInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginInformation, setUserInformation] = useState(null);
    const [error, setError] = useState(null);

    const createUser = useCallback(
        async (e) => {
        e.preventDefault();
        // Assign email and password to variables from form
        const email = e.currentTarget.email.value;
        const name = e.currentTarget.name.value;
        const password = e.currentTarget.password.value;
        const breed = e.currentTarget.breed.value;
        const age = e.currentTarget.age.value;
        const toy = e.currentTarget.toy.value;
        const treat = e.currentTarget.treat.value;
        const fact = e.currentTarget.fact.value;
        const username = e.currentTarget.username.value;
        const date = e.currentTarget.date.value;

        const auth = getAuth();
        const db = getFirestore();
        let user;
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({error, errorCode, errorMessage});
                setError(errorMessage);
            });

            // Create User reference in firestore 
            await addDoc(collection(db, "users" ), {
                username: username,
                name: name,
                breed: breed,
                age: age, 
                date: date, 
                toy: toy, 
                treat: treat,
                fact: fact, 
                userId: user.uid,
                //add description, bio, etc here
            })
                .then(() => {
                    const userToSet = {...user, name}
                //Since the user is true, set logged in
                setIsLoggedIn(true);
                //Provide some information about the user via setState
                setUserInformation(userToSet);
                //Clear any errors
                setError(null);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage});
                    setError(errorMessage);
                });
        },
        [setError, setIsLoggedIn, setUserInformation]
    );

    const loginUser = useCallback((e) => {
        e.preventDefault();
        //Assign email and password to varivles from form 
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        //Create a reference to the auth object
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                //Since the user is true, set logged in
                setIsLoggedIn(true);
                //provide some information about the user via setState
                setUserInformation(user);
                //Clear errors
                setError(null);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.warn({error, errorCode, errorMessage});
                setError(errorMessage);
            });
    }, [setError, setIsLoggedIn, setUserInformation]);

    const logoutUser = useCallback(() => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation(null);
                setIsLoggedIn(false);
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.warn({error, errorCode, errorMessage});
            setError(errorMessage);
        });
    }, [setError, signOut, setIsLoggedIn, setUserInformation]);

    // Initialize Firebase
    useEffect(() => {
        initializeApp(firebaseConfig);
        setAppInitialized(true);
    }, [])

    //User has loaded page, check their status and set state according-------
    useEffect(() => {
        if (appInitialized) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in, see docs for list of available pro-------
                    setUserInformation(user);
                    setIsLoggedIn(true);
                } else {
                    // User is signed out 
                    setUserInformation(null);
                    setIsLoggedIn(false);
                }
                // setLoading to false when everything is complete 
                setIsLoading(false);
            });
        }
    }, [appInitialized]);

    if (isLoading) return null;

    return (
        <>
            <Header isLoggedIn={isLoggedIn} logoutUser={logoutUser}/>
            <Component 
            {...pageProps}
            createUser={createUser}
            loginUser={loginUser}
            isLoggedIn={isLoggedIn}
            loginInformation={loginInformation}
            />
            <p>{error}</p>
        </>
    );
};