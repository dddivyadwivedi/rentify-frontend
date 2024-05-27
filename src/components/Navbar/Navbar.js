import React from 'react';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { connect } from "react-redux";
import { logOut ,  } from "../../store/userRedux";
import {clearSinglePropertyRedux} from '../../store/propertyRedux';
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import './NavbarStyle.css'; 

function NavBar({ userDetails, logoutAsync , clearPropertyDataAsync }) {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand">
          Rentify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/" className="nav-link" >Home</Nav.Link>
            {userDetails !== undefined && userDetails.role === "seller" &&
            <Nav.Link href="/managepost" className="nav-link" onClick={()=>clearPropertyDataAsync()}>Manage Property</Nav.Link>
  }
          </Nav>
          {userDetails === undefined ? (
            <Nav>
              <Nav.Link href="/signup" className="nav-link" >Sign Up</Nav.Link>
              <Nav.Link href="/login" className="nav-link" >Login</Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link className="nav-link signed-as">Signed in as: {userDetails.userName}</Nav.Link>
              <NavDropdown title="Actions" id="basic-nav-dropdown" align="end">
               
                <NavDropdown.Item onClick={() => { logoutAsync(); navigate("/login"); }}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapStateToProps = ({ UserAuth = {} }) => {
  const userDetails = _.get(UserAuth, "userInfo", undefined);

  return {
    userDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  logoutAsync: () => dispatch(logOut()),
  clearPropertyDataAsync : ()=>dispatch(clearSinglePropertyRedux()),

});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
