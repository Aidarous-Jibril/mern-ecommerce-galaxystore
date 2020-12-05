import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './FormContainer.js'
import { userLoginRequest } from '../redux/actions/userActions'
import Loader from '../components/Loader'
import MessageContainer from '../components/MessageContainer.js'

const LoginPage = ({history, loginRequest , user }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //destructure userInfo
    const { userInfo, loading, error } = user; 



    useEffect(() => {
        if(userInfo){
            history.push('/')
        } 
    }, [userInfo, history])

    //submit
    const submitHandler = (e) => {
        e.preventDefault()

        loginRequest(email, password);    

        //reset form fields
        setEmail('');
        setPassword('');
    }

      return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <MessageContainer variant='danger'>{error}</MessageContainer>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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

                <Button type='submit' variant='primary'>
                Sign In
                </Button>
            </Form>

            <Row className='my-3'>
                <Col>
                   New Customer? {' '} <Link to='/register'>Register</Link>
                </Col>
            </Row>
        </FormContainer>
      )
    }
    
    const mapDispatchToProps = dispatch => ({
        loginRequest : (email, password) => dispatch(userLoginRequest ( email, password ))
    });
//mapStateToProps
const mapStateToProps = ({ user }) => ({
    user: user
})
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
