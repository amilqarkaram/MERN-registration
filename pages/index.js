import Link from 'next/link'
import SignIn from '../components/sign-in.js'
import SignOut from '../components/sign-out.js'
import Form from '../components/form.js'
import {useSession} from 'next-auth/client'
import {useEffect,useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import styles from "../styles/Home.module.css"
const util = require('util')
import axios from 'axios';
import fetch from 'isomorphic-unfetch'
export default function Home(props){
  const[data,setData] = useState(null);
  console.log("data: ");
  console.log(util.inspect(data, {showHidden: false, depth: null}));
  const [session] = useSession();
  if(session){
    console.log(util.inspect(session.user, {showHidden: false, depth: null}));
  }
  useEffect(()=>{
      let info = null;
      if(session && session.user){
      async function getInfo(){
        axios.get('http://localhost:3000/api/hello/?githubName=' + session.user.name)
        .then(function(response){
          console.log("Response: ");
          console.log(util.inspect(response, {showHidden: false, depth: null}));
          setData(response.data)
        });
      }
      getInfo();
    }
  },[session])
  return(
    <div>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Red+Hat+Display&display=swap" rel="../styles/globals.css"/>
      </head>
      {!session ?
      <SignIn/> : ""}
      {session ?
      <Container>
        <Row>
          <Col>
            <img className={styles.imageLogo}src="/images/mp_gradient_rock.svg"/>
          </Col>
          <Col md="12" lg="8"><Form user={data}/></Col>
        </Row>
        <SignOut/>
      </Container>
      : ""}
    </div>
  );
}
// export async function getServerSideProps() {
//   console.log("this function is called");
//   // Get external data from the file system, API, DB, etc.
//   let data = null;
//   if(session !== undefined){
//   data = await fetch('http://localhost:3000/api/hello/' + session.user.name, {
//     method: 'get',
//   })
// }
// console.log("data: " + data);
//   // The value of the `props` key will be
//   //  passed to the `Home` component
//   return {
//     props: {data}
//   }
// }
