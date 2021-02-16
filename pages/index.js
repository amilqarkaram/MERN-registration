import Link from 'next/link'
import SignIn from '../components/sign-in.js'
import SignOut from '../components/sign-out.js'
import {useSession} from 'next-auth/client'
const util = require('util')

export default function Home(){
  const [session] = useSession();
  if(session){
    console.log(util.inspect(session.user, {showHidden: false, depth: null}));
  }
  return(
    <div>
      {!session ? <SignIn/> : ""}
      {session ? <SignOut/> : ""}
    </div>
  );
}
