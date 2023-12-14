import styles from './components.module.css'

const UserProfileCard = ({user}) => {
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
       <div className={styles.UserProfile}>
            <div className={styles.profileUsername}>   
                <p>@{user?.username}</p>
            </div>
            <div className={styles.bioContent}>
           <div className={styles.profileText}>
                <p>Name: {user?.name}</p>
                <p>Breed: {user?.breed}</p> 
                <p>Age: {user?.age}</p>
                <p>Gotcha Date: {user?.date}</p>
                <p>Favorite Toy: {user?.toy}</p>
                <p>Go to Treat: {user?.treat}</p> 
                <p>Fun Fact: {user?.fact}</p>
           </div>
           {/* trying to add a profile image */}
           <div className={styles.imageContent}>
                <p>This is me!</p>
                <img id="display" src="https://placedog.net/500/280"/>
           </div>
       </div>
       </div>
    </>
   )};

export default UserProfileCard;