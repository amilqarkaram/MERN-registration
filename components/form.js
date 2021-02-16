import {Form,Button} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import {Col} from 'react-bootstrap'
import styles from '../styles/Home.module.css'
import {useSession} from 'next-auth/client'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'
const util = require('util')
export default function form(props){
  const [session] = useSession();
  console.log("props:" );
  console.log(util.inspect(props, {showHidden: false, depth: null}));
  const [readOnly,setReadOnly] = useState(props.user);
  console.log("read ONly value: " + readOnly);
  const [userInfo,setUserInfo] = useState(function(){
    return(
      {
        firstName: props.user ? props.user.firstName : "",
        lastName: props.user ? props.user.lastName : "",
        emailAddress: props.user ? props.user.emailAddress : "",
        textResponse: props.user ? props.user.text : "",
        image: session ? session.user.image : "",
        githubName: session.user.name
      }
    );
  })
  console.log("user Info");
  console.log(util.inspect(userInfo, {showHidden: false, depth: null}));
  useEffect(()=>{
    setReadOnly(props.user);
    setUserInfo({
          firstName: props.user ? props.user.firstName : "",
          lastName: props.user ? props.user.lastName : "",
          emailAddress: props.user ? props.user.emailAddress : "",
          textResponse: props.user ? props.user.textResponse : "",
          image: session ? session.user.image : "",
          githubName: session.user.name
    });
  },[props.user]);
  function handleSubmit(event){
  console.log(util.inspect(userInfo, {showHidden: false, depth: null}));
  fetch('/api/hello', {
  method: 'post',
  body: JSON.stringify(userInfo)
})
      if(props){
      props.user.firstName = userInfo.firstName;
      props.user.lastName = userInfo.lastName;
      props.user.emailAddress = userInfo.emailAddress;
      props.user.textResponse = userInfo.textResponse;
    }
      setReadOnly(true);
  }
  function handleEdit(event){
    setReadOnly(false);
  }
  function handleChange(event){
    setUserInfo(function(currentState){
      const obj = currentState;
      obj[event.target.name] = event.target.value;
      return(
        {
          ...obj,
        }
      );
    });
  }
  return(
    <div className={styles.formContainer}>
    <Form>
    <Form.Group>
      <Form.Label>First Name</Form.Label>
      <Form.Control
        placeholder="First Name"
        type="text"
        name="firstName"
        value={props.user && readOnly? props.user.firstName: userInfo.firstName}
        defaultValue= {props.user && readOnly? props.user.firstName : userInfo.firstName}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        placeholder="Last Name"
        type="text"
        name="lastName"
        value={props.user && readOnly? props.user.lastName: userInfo.lastName}
        defaultValue= {props.user &&readOnly ? props.user.lastName : userInfo.lastName}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        name="emailAddress"
        value={props.user && readOnly? props.user.emailAddress: userInfo.emailAddress}
        defaultValue= {props.user && readOnly? props.user.emailAddress : userInfo.emailAddress}
        readOnly={readOnly}
        onChange={handleChange}
        />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>
    <Form.Group controlId="exampleForm.ControlTextarea1">
      <Form.Label>What languages are you most proficient in?</Form.Label>
      <Form.Control
      placeholder="C++, Javascript, Python, etc..."
      as="textarea"
      name="textResponse"
      rows={3}
      value={props.user && readOnly? props.user.textResponse: userInfo.textResponse}
      defaultValue= {props.user && readOnly? props.user.textResponse : userInfo.textResponse}
      readOnly={readOnly}
      onChange={handleChange}
      />
    </Form.Group>
    <Form.Row>
    <Form.Group as={Col}>
    <Button onClick={handleSubmit} variant="primary" type="button">
    Submit
    </Button>
    </Form.Group>
    {readOnly ?
      <Form.Group as={Col}>
      <Button className={styles.editButton}onClick={handleEdit} variant="primary" type="button">
      Edit
      </Button>
      </Form.Group>:
      ""
    }
    </Form.Row>
</Form>
    </div>
  );
}
