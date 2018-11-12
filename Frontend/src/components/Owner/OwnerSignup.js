import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import OwnerNavbar from './OwnerNavbar';
import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { signupUser } from '../../actions/userActions';
import { connect } from 'react-redux';

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            created: false
        }
    }
    componentWillMount(){
        this.setState({
            created : false
        })
    }
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    onSubmit = (e) => {
        var headers = new Headers();
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email : this.state.email,
            password : this.state.password,
            flag: 'o'
        }
        this.props.signupUser(data);
    }

    render(){
        let redirectVar = null;

        if(localStorage.getItem('email') && localStorage.getItem('flag')==='o'){
            redirectVar = <Redirect to= "/ownerdash"/>
        }
        return(
            <div>
                {redirectVar}
                <OwnerNavbar />
                <div id="container">
                    <div id="login-container">
                        <div className="login-header traveler">
                            <h1>Sign up as Owner</h1>
                            <div className="login-footer">
                                <span>Already have an account? </span>
                                <span><Link to="/ownerlogin"> Log in</Link></span>
                            </div>
                        </div>
                        <div id="form-container-signup">
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
                                                    <Input 
                                                        type="text" 
                                                        name="firstName" 
                                                        placeholder="First Name" 
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={10}>
                                                    <Input 
                                                        type="text" 
                                                        name="lastName" 
                                                        placeholder="Last Name" 
                                                        onChange={this.onChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Col sm={10}>
                                                    <button class="btn btn-primary-login btn-lg">Signup</button>
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

export default connect(null, {signupUser})(Signup);