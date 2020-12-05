import React from 'react'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'; //using LINKCONTAINER FOR THE NAVIGATION LINKS
import {Navbar, Nav, Container, NavDropdown  } from 'react-bootstrap'
import { userLogoutResquest } from '../redux/actions/userActions'

const Header = ({ user , userLogoutResquest}) => {
    //Destructure userInfo from user
    const { userInfo } = user;

    // //logoutHandler 
    // const logoutHandler = () => {
    //     userLogoutResquest();
    // }

    return (
        <header>

            <Navbar bg="dark"  variant="dark" expand="lg" collapseOnSelect> 
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Galaxy Store</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Min Profil</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={userLogoutResquest}>
                                        Logga Ut
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                <Nav.Link>
                                    <i className='fas fa-user'></i> Logga In
                                </Nav.Link>
                                </LinkContainer>
                            )}
                           
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

const mapDispatchToProps = dispatch => ({
    userLogoutResquest: () => dispatch(userLogoutResquest())
})
//mapStateToProps
const mapStateToProps = ({ user }) => ({
    user: user
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)
