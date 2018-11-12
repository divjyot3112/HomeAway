import React, {Component} from 'react';
import TravellerNavbar from './TravellerNavbar';
import { connect } from 'react-redux';
import { postProfile, getUser } from '../../actions/userActions';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
 
class Profile extends Component{
    state = {
        path: '../../profile.png',
        edit_flag: false,
        update_flag: false
    }
    componentDidMount() {
        this.props.getUser();
            
                const { user } = this.props.user;
                this.setState({
                     firstName: user.firstName,
                    lastName: user.lastName,
                    about: user.about,
                    city: user.city,
                    country: user.country,
                    school: user.school,
                    hometown: user.hometown,
                    languages: user.languages,
                    gender: user.gender,
                    email: user.email
                })
            
    }
    handleEditProfile = (e) => {
        this.setState({edit_flag: true})
        document.getElementById('fieldset').disabled = false;
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = (e) => {
        this.setState({edit_flag: false})
        e.preventDefault();
        document.getElementById('fieldset').disabled = true;
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            about: this.state.about,
            city: this.state.city,
            country: this.state.country,
            school: this.state.school,
            hometown: this.state.hometown,
            languages: this.state.languages,
            gender: this.state.gender,
            email: this.state.email
        }
        this.props.postProfile(data);
    }
    render(){
        
        var redirectVar = null;
        if(!localStorage.getItem('email')) {
            redirectVar = <Redirect to= "/travlogin"/>
        }
        return(
            <div>
                {redirectVar}
               <TravellerNavbar/>
                <div className="profile-header">
                    <div className="profile-header-photo">
                        <div className="photo-circle">
                            <div className="user-photo" style={{backgroundImage: 'url('+require('../../images/profile.png')+')'}}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile-content">
                    <div className="edit-profile-button"><button className="btn btn-outline-secondary" onClick = {this.handleEditProfile}>Edit Profile</button></div>
                    <form id="profile-info" method="POST">
                        <fieldset id="fieldset" disabled>
                        <div className="profile-content-border">
                            <div className="profile-content-header">
                                <h2>Profile Information</h2>
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.firstName} onChange={this.onChange} id="firstName" name="firstName" className="form-control" placeholder="First name" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.lastName} onChange={this.onChange} name="lastName" className="form-control" placeholder="Last name" />
                            </div>
                            <div className="form-group">
                                <textarea name="about" value={this.state.about} onChange={this.onChange} style={{width: '100%', height: 80}} className="form-control" placeholder="About me"></textarea>
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.city} onChange={this.onChange} name="city" className="form-control" placeholder="My city" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.country} onChange={this.onChange} name="country" className="form-control" placeholder="Country" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.school} onChange={this.onChange} name="school" className="form-control" placeholder="School" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.hometown} onChange={this.onChange} name="hometown" className="form-control" placeholder="Hometown" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.languages} onChange={this.onChange} name="languages" className="form-control" placeholder="Languages" />
                            </div>
                            <div className="form-group">
                                <input type="text" value={this.state.gender} onChange={this.onChange} name="gender" className="form-control" placeholder="Gender" />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary" onClick={this.onSubmit}>Save Changes</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { getUser,postProfile })(Profile);