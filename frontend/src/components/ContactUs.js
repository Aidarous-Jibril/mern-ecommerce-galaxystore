import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../Pages/FormContainer.js'



const ContactUs = ( ) => {
    let history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    //submit
    const submitHandler = (e) => {
        e.preventDefault()
        const config = { name, email, message}

        axios.post(`/api/users/contact-us`, config).then((response)=>{
          if (response.data.status === 'success') {
            window.alert("Message is sent."); 
            console.log(response)
            //reset form fields
            setName('')
            setEmail('');
            setMessage('');
            history.push('/')
          } else if(response.data.status === 'fail') {
            window.alert("Message failed.")
          }
        })
  }

  return (
<FormContainer className='container'>
        <h1>KONTAKTA OSS</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicName">
                <Form.Label> Namn </Form.Label>
                <Form.Control type="name" placeholder="Enter name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='message'>
                <Form.Label>Meddelande</Form.Label>
                <Form.Control
                    type='message'
                    placeholder='Skriv ditt meddelande'
                    as="textarea" rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
                Skicka
            </Button>
        </Form>

</FormContainer>
  )
}

export default ContactUs