import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './FormContainer.js'
import { userRegisterRequest } from '../redux/actions/userActions'
import Loader from '../components/Loader.js'
import MessageContainer from '../components/MessageContainer'


const RegisterPage = () => {
    let navigate = useNavigate();
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    //destructure from state
    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error} = userRegister; 

    useEffect(() => {
        if(userInfo){
            navigate.push('/')
        } 
    }, [userInfo, navigate])

    //submit
  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password do not match')
    } else {
        dispatch(userRegisterRequest(name, email, password));
    }

    //reset form fields
    setName('')
    setEmail('');
    setPassword('');
  }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <MessageContainer variant='danger'>{error.password || error.email}</MessageContainer>}
        {message && <MessageContainer variant='danger'>{message}</MessageContainer>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="formBasicName">
                <Form.Label> Name </Form.Label>
                <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
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

            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Confirm password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
            Sign In
            </Button>
        </Form>

        <Row className='my-3'>
            <Col>
               Already have an Account? {' '} <Link to='/login'>Login</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterPage;
