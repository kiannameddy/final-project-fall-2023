import styles from "./components.module.css";

const PostCard = ({post}) => {
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
        <div className={styles.feed}>
        <div>
            <div className={styles.PostCardWrapper}>
{/* Trying to get the username to show with the post */}
                <div className={styles.feedUsername}> 
                    <p>@{post?.userId}</p>
                </div>
                <div className={styles.feedImage}>
                    <img src={post?.imageURL} alt=""/>
                </div>
                <div className={styles.feedPostText}>
                    <p>{post?.postContent}</p>
                </div>
             </div>
         </div>
         </div>
        </>
    );
};

export default PostCard; 
