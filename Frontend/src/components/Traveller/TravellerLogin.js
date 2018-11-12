import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import TravellerNavbar from './TravellerNavbar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/userActions';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class TravellerLogin extends Component{
    state = {
        email : "",
        password : "",
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.email || !this.state.password){
            window.alert("All fields are required");
        } else {
            const data = {
                email : this.state.email,
                password : this.state.password,
                flag: 't'
            }
            this.props.loginUser(data);
        }
    }
    
    render(){
        let redirectVar = null;

        if(localStorage.getItem('email') && localStorage.getItem('flag')==='t'){
            redirectVar = <Redirect to= "/profile"/>
        }
        return(
            <div>
                {redirectVar}
                <TravellerNavbar />
                <div id="container">
                    <div id="login-container">
                        <div className="login-header traveler">
                            <h1>Log in to Homeaway</h1>
                            <div className="login-footer">
                                <span>Need an account? </span>
                                <span><Link to="/travsignup"> Sign Up</Link></span>
                            </div>
                        </div>
                        <div id="form-container-login">
                            <div className="panel panel-dashboard">
                                <div className="panel-heading">
                                    <p className="panel-title">Account Login</p>
                                </div>
                                <div className="panel-body">
                                    <div className="field-group traveler">
                                        <Form onSubmit={this.onSubmit}>
                                            <FormGroup row>
                                                <Col sm={10}>
                                                    <Input 
                                                        type="email" 
                                                        name="email" 
                                                        placeholder="Email address" 
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={10}>
                                                    <Input 
                                                        type="password" 
                                                        name="password" 
                                                        placeholder="Password" 
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={10}>
                                                    <button class="btn btn-primary-login btn-lg">Login</button>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
        )
    }
}

TravellerLogin.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { loginUser })(TravellerLogin);