import Link from 'next/link'
import SignIn from '../components/sign-in.js'
import SignOut from '../components/sign-out.js'
import Form from '../components/form.js'
import {useSession} from 'next-auth/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import styles from "../styles/Home.module.css"
const util = require('util')
export default function Home(){
  const [session] = useSession();
  if(session){
    console.log(util.inspect(session.user, {showHidden: false, depth: null}));
  }
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
          <Col md="12" lg="8"><Form/></Col>
        </Row>
        <SignOut/>
      </Container>
      : ""}
    </div>
  );
}
