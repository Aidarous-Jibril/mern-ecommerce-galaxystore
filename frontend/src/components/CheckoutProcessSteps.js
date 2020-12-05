import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutProcessSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='justify-content-center mb-4'  >
            <Nav.Item>
                {step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>Logga In</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Logga In</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>Frak</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Frak</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>Betalning</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Betalning</Nav.Link>
                )}
            </Nav.Item>
    

            <Nav.Item>
                {step4 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Beställa</Nav.Link>
                </LinkContainer>
                ) : (
                <Nav.Link disabled>Beställa</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutProcessSteps
