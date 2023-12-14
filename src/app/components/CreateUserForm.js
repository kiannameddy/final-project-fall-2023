import styles from "./components.module.css";
import {useState} from "react";
import {Catamaran} from "next/font/google"

const catamaran = Catamaran({
    subsets: ['latin'],
    display: 'swap',
    weight: '500'
})

const CreateUserForm = ({createUser}) => {
    const [imageUpload, setImageUpload] = useState();
    return (
        <div className={styles.createUserContent}>
            <div className={catamaran.className}>
                <h2>Create User</h2>
                <form className={styles.createUserForm} onSubmit={(e) => createUser(e)}>
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="username" id="username"/>

                    <label htmlFor="name">Pet's Name:</label>
                    <input type="text" name="name" id="name"/>

                    <label htmlFor="breed">Breed:</label>
                    <input type="text" name="breed" id="breed"/>

                    <label htmlFor="age">Age:</label>
                    <input type="text" name="age" id="age"/>

                    <label htmlFor="date">Gotcha Date:</label>
                    <input type="text" name="date" id="date"/>

                    <label htmlFor="toy">Favorite Toy:</label>
                    <input type="text" name="toy" id="toy"/>

                    <label htmlFor="treat">Go to Treat:</label>
                    <input type="text" name="treat" id="treat"/>

                    <label htmlFor="fact">Fun Fact:</label>
                    <input type="text" name="fact" id="fact"/>

                    <label htmlFor="email">Email:</label>
                    <input type="email" name="email"/>

                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="password"/>

                    {/* Trying to add a spot to unpload a user profile */}
                    {/* <div> 
                        <label htmlFor="profilePicture">Profile Picture</label>
                        <input
                            type="file"
                            id="profilePicture"
                            name="profilePicture"
                            placeholder="Choose image"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={(e) => {
                                setImageUpload(e.target.files[0])
                            }}
                        />
                    </div> */}
                    {/* <div className={styles.createPostForm}
                        onSubmit={(e) => profilePictureFunction(e, imageUpload)}>
                        <div> 
                            <label htmlFor="profilePicture">Image</label>
                            <input
                                type="file"
                                id="profilePicture"
                                name="profilePicture"
                                placeholder="Choose image"
                                accept="image/png,image/jpeg,image/gif,image/jpg"
                                onChange={(e) => {
                                    setImageUpload(e.target.files[0])
                                }}
                            />
                        </div>
                    <button type="submit">Create User</button>
               */}
               <button type="submit">Create User</button>
                </form>
            </div>
            <div className={styles.createUserImg}> 
                <img src="https://i.pinimg.com/564x/9d/e3/e8/9de3e8ab87e2b91c83e6c3aa6110dfd9.jpg" alt="Ballon animal instructions"/>
            </div>
        </div>
    );
};

export default CreateUserForm;