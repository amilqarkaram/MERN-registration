import {Form,Button} from 'react-bootstrap'
import {useState} from 'react'
import styles from '../styles/Home.module.css'
import {useSession} from 'next-auth/client'
import axios from 'axios'
import fetch from 'isomorphic-unfetch'
const util = require('util')
export default function form(){
  const [session] = useSession();
  const [inputs,setInput] = useState(function(){
    return(
      {
        firstName: "",
        lastName: "",
        emailAddress: "",
        textResponse: "",
        image: session ? session.user.image : ""
      }
    );
  })
  function handleSubmit(event){
  console.log(util.inspect(inputs, {showHidden: false, depth: null}));
  fetch('mern-registration-13cozuyyx.vercel.app/api/hello', {
  method: 'post',
  body: JSON.stringify(inputs)
})
    setInput(function(currentState){
      return(
        {
          ...currentState,
          firstName: "",
          lastName: "",
          emailAddress:"",
          textResponse: "",
        }
      );
    });
  }
  function handleChange(event){
    setInput(function(currentState){
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
        value={inputs.firstName}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group>
      <Form.Label>Last Name</Form.Label>
      <Form.Control
        placeholder="Last Name"
        type="text"
        name="lastName"
        value={inputs.lastName}
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        name="emailAddress"
        value={inputs.emailAddress}
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
      value={inputs.textResponse}
      onChange={handleChange}
      />
    </Form.Group>
    <Button onClick={handleSubmit} variant="primary" type="button">
    Submit
    </Button>
</Form>
    </div>
  );
}
