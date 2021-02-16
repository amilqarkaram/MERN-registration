import {signOut} from 'next-auth/client'
import {Button} from 'react-bootstrap'
import styles from '../styles/Home.module.css'
const handleSignOut = (e) => {
  e.preventDefault()
  signOut()
}
export default function SignOut(){
  return(
    <div className={styles.signOutButton}>
      <Button onClick={handleSignOut}>Sign-Out</Button>
    </div>
  );
}
