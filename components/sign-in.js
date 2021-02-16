import {signIn} from 'next-auth/client'
const handleSignIn = (e) => {
  e.preventDefault()
  signIn()
}
export default function SignIn(){
  return(
    <div>
      <button onClick={handleSignIn}>Sign-In</button>
    </div>
  );
}
