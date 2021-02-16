import {signIn} from 'next-auth/client'
import {Button} from 'react-bootstrap'
import styles from '../styles/Home.module.css'
const handleSignIn = (e) => {
  signIn();
}
export default function SignIn(){
  return(
    <div className={styles.signInButton}>
      <Button style={{fontSize: "200%"}}onClick={handleSignIn}>Sign-In with Github</Button>
    </div>
  );
}
