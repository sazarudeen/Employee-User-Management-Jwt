import React, { useState } from 'react';
import {Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { postData } from '../Client/AxiosClient';
import $ from 'jquery'
import ApiConstants from '../Constants/Endpoints';
import { ToastContainer } from 'react-toastify';
import { toastFunctions } from '../Status/StatusBar';
const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [warningBanner, setWarningBanner] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser')
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdmin');
    // Perform any validation if needed
    $("#login").hide();
    $(".spinner-border").show()
    try {

      const payLoad = {
        userName: username,
        password: password
      }

      const response = await postData(ApiConstants.AUTH_RESOURCE + '/login', payLoad);

      if (response.status === 200) {
        if (response.data.token) {
          var currentuser = {
            username,
            isAuthenticated: true,
            token: response.data.token,
            isAdmin : response.data.admin
          };

          localStorage.setItem('currentUser', JSON.stringify(currentuser))
          localStorage.setItem('isAuthenticated', true);
          localStorage.setItem('isAdmin', response.data.admin);
          localStorage.removeItem('loggedOut')
          toastFunctions.showSuccessToast('You are Sucessfully Logged in',1500)
          setTimeout(() => {
            setLoading(true)
            window.document.location = window.origin + "/home"
          }, 1000);

        } else {
          $("#login").show();
          $(".spinner-border").hide()
          var message = 'Invalid credentials';
          setWarningBanner(true);
        }
      }
    } catch (error) {
      $(".spinner-border").hide()
      $("#login").show();
      localStorage.removeItem('loggedOut')
      if(error.response && error.response.data && error.response.data.classType && error.response.data.classType.includes('UsernameNotFoundException')){
        toastFunctions.showErrorToast(error.response.data.message+'. Please register or Enter valid credentials',4000)
      }
    }

  };


  return (
    <Container className="mt-5">
      {loading ? (
        <div className="loader loader-align">
          <div className="spinner"></div>
          <strong><p style={{color:"white"}}>Loading...</p></strong>
        </div>
      ) : (
        <Row className="justify-content-center">
          <ToastContainer/>
          <Col md={4} style={{ "margin-left": "-16%" }}>
            <div className="card">
              <div className="card-body card-body-3">
                <h2 className="card-title text-center">Login</h2>
                <Form>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="d-grid alignButton">
                    <div
                      id='login'
                      className="btn btn-primary"
                      variant="primary"
                      type="button"
                      onClick={handleLogin}
                    >
                      Login
                    </div>
                    <div class="spinner-border text-primary" style={{ display: "none", marginLeft: "46%" }} role="status">
                    </div>
                    <Link to="/register">
                      <div
                        variant="success"
                        type="button"
                        className="btn btn-success"
                        style={{ marginTop: "10px", width: "100%" }}
                      >
                        Register
                      </div>
                    </Link>
                    {
                      localStorage.getItem('loggedOut') && !warningBanner && (
                        <div className="alert alert-success" style={{ marginTop: "10px" }}>
                          {
                            location.state?.currentUser
                              ? `${location.state.currentUser} have been logged out`
                              : `You have been logged out`
                          }
                        </div>
                      )
                    }

                    {
                      warningBanner && (
                        <div class="alert alert-danger" style={{ marginTop: "10px" }}>
                          Invalid credentials
                        </div>
                      )
                    }
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      )
      }
    </Container>
  );
};

export default LoginComponent;
