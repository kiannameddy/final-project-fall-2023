import styles from "./components.module.css";
import {Catamaran} from "next/font/google"

const catamaran = Catamaran({
    subsets: ['latin'],
    display: 'swap',
    weight: '500'
})

const LoginForm = ({loginUser}) => {
    return (
        <div className={styles.loginContent}>
            <div className={catamaran.className}>
                <h2 className={styles.loginFormTitle}>Login</h2>
                <form className={styles.loginForm} onSubmit={(e) => loginUser(e)}>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email"/>

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password"/>

                    <button type="submit">Login</button>
                </form>
            </div>
            <div className={styles.loginImg}> 
                <img src="https://i.pinimg.com/564x/6c/c8/1d/6cc81da45e1e9626dc8d83528f272a00.jpg" alt="Pink dog ballon animal"/>
            </div>
        </div>
    );
};

export default LoginForm;