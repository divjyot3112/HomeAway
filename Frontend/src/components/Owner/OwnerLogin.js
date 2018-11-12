import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import { loginUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import OwnerNavbar from './OwnerNavbar';
import PropTypes from 'prop-types';

class OwnerLogin extends Component{
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
                flag: 'o'
            }
            this.props.loginUser(data);
        }
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
                    <div id="login-container" style={{height:'340px',marginLeft:'-15px',marginRight:'-15px'}}>
                        <div className="owner-login-photo">
                            <a id="owner-login-photo"></a>
                        </div>
                        <div id="form-container-owner-login">
                            <div className="panel panel-dashboard">
                                <div className="panel-heading">
                                    <p className="panel-title">Owner Login</p>
                                </div>
                                <div className="login-footer">
                                        <span>Need an account? </span>
                                        <span><Link to="/ownersignup"> Sign Up</Link></span>
                                </div>
                                <div className="panel-body">
                                    <div className="field-group traveler">
                                        <form id="login-form" onSubmit={this.onSubmit} class="singleSubmit">
                                            <div className="errors">
                                            </div>
                                            <br />
                                            <div className="has-feedback form-group floating-label">
                                                <input type="email" name="email" onChange={this.onChange} className="form-control input-lg" placeholder="Email address" autoComplete="on" />
                                            </div>
                                            <div className="has-feedback form-group floating-label">
                                                <input type="password" name="password" onChange={this.onChange} className="form-control input-lg" placeholder="Password" autoComplete="off" />
                                            </div>
                                            <div className="form-group">
                                                <input type="submit" class="btn btn-primary-login btn-lg" value="Log In" id="form-submit" tabindex="4" />
                                            </div>
                                        </form>
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

OwnerLogin.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, {loginUser})(OwnerLogin);