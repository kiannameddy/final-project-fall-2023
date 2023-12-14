import {useState} from "react";
import styles from "./components.module.css";
import { Agbalumo, Catamaran } from 'next/font/google';

const agbalumo = Agbalumo({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
  })

const catamaran = Catamaran({
    subsets: ['latin'],
    display: 'swap',
    weight: '500'
})

const CreatePostForm = ({createPostFunction}) => {
    const [imageUpload, setImageUpload] = useState();
    return (
        <>
        <style jsx global>
            {`
                body {
                    background-color: #fafafa;
                    background-image:  linear-gradient(#7eb8ff 1.2000000000000002px, transparent 1.2000000000000002px), linear-gradient(to right, #7eb8ff 1.2000000000000002px, #fafafa 1.2000000000000002px);
                    background-size: 24px 24px;
                }

                header {
                    background-color: white;
                    border-radius: 20px; 
                    border: solid #f5b1ec;
                    box-shadow: 5px 5px 5px #f5b1ec
                }

                main {
                    font-family: 'Catamaran', sans-serif;
                }
            `}
        </style>
        <div className={catamaran.className}>
            <div className={styles.createPostForm}>
                <div>
                <form 
                onSubmit={(e) => createPostFunction(e, imageUpload)}>
                    <div className={styles.createPostImage}> 
                        <label htmlFor="image"></label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            placeholder="Choose image"
                            accept="image/png,image/jpeg,image/gif,image/jpg"
                            onChange={(e) => {
                                setImageUpload(e.target.files[0])
                            }}
                        />
                    </div>
                    <div className={styles.createPostText}>
                        <label htmlFor="postContent"></label>
                        <input className={styles.createPostBox} type="text" id="postContent" name="postContent" placeholder="Write a caption..."/>
                    </div>
                    <div className={styles.createPostButton}>
                        <button type="submit">Create Post</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default CreatePostForm;