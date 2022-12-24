import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from './FormContainer.js'
import { userLoginRequest } from '../redux/actions/userActions'
import Loader from '../components/Loader'
import MessageContainer from '../components/MessageContainer.js'
import GoogleLoginPage from './GoogleLoginPage.js'

const LoginPage = ({history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();

    //destructure userInfo from state
    const user = useSelector(state => state.user)
    const { userInfo, loading, error } = user; 

    useEffect(() => {
        if(userInfo){
            history.push('/shipping')
        } 
    }, [userInfo, history])

    //submit
    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(userLoginRequest(email, password));    

        //reset form fields
        setEmail('');
        setPassword('');
    }


      return (
        <FormContainer>
            <h1>Logga in</h1>
            {error && <MessageContainer variant='danger'>{error.password || error.email}</MessageContainer>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='Ditt email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                <Form.Label>Lösenord</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='Ditt Lösenord'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                </Form.Group>

                <Button type='submit' className='btn btn-block my-3' variant='primary'>
                    Logga In
                </Button>           
                { }
                <Row   >  
                    <div  className='btn btn-block social' > <GoogleLoginPage/> </div>                    
                </Row>
            </Form>

            <Row className='my-2'>
                <Col>
                   Ny Kund? {' '} <Link to='/register'>Registrera Dig</Link>
                </Col>
            </Row>
        </FormContainer>
      )
    }


export default LoginPage;

