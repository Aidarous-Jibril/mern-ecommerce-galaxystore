import React, { useState } from 'react'
// import { useHistory } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../Pages/FormContainer.js'
import MessageContainer from './MessageContainer.js'


const ContactUs = ( ) => {
    // let history = useHistory();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [formUpdate, setFormUpdate] = useState('')

    //submit
    const submitHandler = (e) => {
        e.preventDefault()
        if(name === '' | email === '' | message === ''){
          setFormUpdate('Fyll i alla fält')
        } else {
          setFormUpdate('Meddelande skickad')
            setName('')
            setEmail('');
            setMessage('');

        }
        //using nodemailer
        // const config = { name, email, message}
        // axios.post(`/api/users/contact-us`, config).then((response)=>{
        //   if (response.data.status === 'success') {
        //     window.alert("Message is sent."); 
        //     console.log(response)
        //     //reset form fields
        //     setName('')
        //     setEmail('');
        //     setMessage('');
        //     history.push('/')
        //   } else if(response.data.status === 'fail') {
        //     window.alert("Message failed.")
        //   }
        // })
  }

  return (
<FormContainer className='container'>
        <h1>KONTAKTA OSS</h1>
        <Form onSubmit={submitHandler}>
          {formUpdate && <MessageContainer variant='info'>{formUpdate}</MessageContainer>}
            <Form.Group controlId="name">
                <Form.Label> Namn </Form.Label>
                <Form.Control
                  required 
                  type="name" 
                  placeholder="Enter name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='message'>
                <Form.Label>Meddelande</Form.Label>
                <Form.Control
                    required
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