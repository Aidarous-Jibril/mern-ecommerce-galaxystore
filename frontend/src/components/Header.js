import React from "react";
import { connect } from "react-redux";
import { LinkContainer } from "react-router-bootstrap"; //using LINKCONTAINER FOR THE NAVIGATION LINKS
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { userLogoutResquest } from "../redux/actions/userActions";
import { Route } from "react-router-dom";
import SearchBox from "./SearchBox";

const Header = ({ user, userLogoutResquest }) => {

  //Destructure userInfo from user
  const { userInfo } = user;

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Galaxy Store</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            {/* Use render props here to pass history into SearchBox as prop */}
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ml-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Min Profil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={userLogoutResquest} >
                    Logga Ut
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (

                <>              
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Logga In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/contact-us">
                    <Nav.Link>
                    <i className="fas fa-envelope-square"></i> Kontakta Oss
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userLogoutResquest: () => dispatch(userLogoutResquest()),
});
//mapStateToProps
const mapStateToProps = ({ user }) => ({
  user: user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
