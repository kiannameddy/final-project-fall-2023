import Link from "next/link";
import styles from "./components.module.css";
// import { Agbalumo, Catamaran } from 'next/font/google';

// const agbalumo = Agbalumo({
//     subsets: ['latin'],
//     display: 'swap',
//     weight: '400'
//   })

// const catamaran = Catamaran({
//     subsets: ['latin'],
//     display: 'swap',
//     weight: '500'
// })

const Header = ({isLoggedIn, logoutUser}) => {
    return (
        <>
    <style jsx global>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Agbalumo&family=Catamaran&display=swap');
            header {
                background-color: white;
                border-radius: 20px; 
                border: solid #f5b1ec;
                box-shadow: 5px 5px 5px #f5b1ec
            }

            header h1 {
                font-family: 'Agbalumo', sans-serif;
            }

            header a {
                font-family: 'Catamaran', sans-serif;
            }

        `}
    </style>
        <header className={styles.Header}>
            <div className={styles.webTitle}>
                <h1>BarkBook</h1>
            </div>
            <nav className={styles.HeaderNav}>
                {isLoggedIn && (
                    <>
                    <div>
                        <Link href="/">Home</Link>
                        <Link href="/profile">Profile</Link>
                        <Link href="/createPost">Post</Link>
                        <a onClick={logoutUser}>Log Out</a>
                    </div>

                    </>
                )}
                {!isLoggedIn && (
                    <>
                    <div>
                        <Link href="/login">Login</Link>
                        <Link href="/createUser">Create User</Link>
                    </div>
                    </>
                )}
            </nav>
        </header>
        </>
    )};

export default Header;