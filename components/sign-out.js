import {signOut} from 'next-auth/client'
const handleSignOut = (e) => {
  e.preventDefault()
  signOut()
}
export default function SignOut(){
  return(
    <div>
      <button onClick={handleSignOut}>Sign-Out</button>
    </div>
  );
}
