import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from './FormContainer.js'
import Loader from '../components/Loader.js'
import MessageContainer from '../components/MessageContainer'
import { getUserProfileDetails, updateUser } from "../redux/actions/userActions";
import { USER_UPDATE_BY_ADMIN_RESET  } from '../redux/types/userTypes'

const UserEditPage = () => {
  let { userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  
  // Destr from userUpdate state
  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, userProfileDetails } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate


  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_BY_ADMIN_RESET })
      navigate.push('/admin/userlist')
    } else {
      if (!userProfileDetails.name || userProfileDetails._id !== userId) {
        dispatch(getUserProfileDetails(userId))
      } else {
        setName(userProfileDetails.name)
        setEmail(userProfileDetails.email)
        setIsAdmin(userProfileDetails.isAdmin)
      }
    }
  }, [dispatch, navigate, userId, userProfileDetails, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <MessageContainer variant='danger'>{errorUpdate}</MessageContainer>}
        {loading ? (
          <Loader />
        ) : error ? (
          <MessageContainer variant='danger'>{error}</MessageContainer>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
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

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

  
export default UserEditPage;