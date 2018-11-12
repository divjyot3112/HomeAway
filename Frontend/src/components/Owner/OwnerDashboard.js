import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import OwnerNavbar from './OwnerNavbar';
import {
    Jumbotron,
    Media
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImages, getUser } from '../../actions/userActions';

class OwnerDashboard extends Component{
    state = {
        user: "",
        images: ""
    }
    componentDidMount() {
        this.props.getImages();
        this.props.getUser();
        this.setState({
            images: this.props.images
        })

    }
    
    render(){

        let redirectVar = null;

        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }
        
        const{ user } = this.props.user;
        let bookedList = [];
        let unbookedList = [];
        for (var key in user.properties) {
            if(user.properties[key].bookingInfo) {
                bookedList.push(
                <div>
                    <Media body>
                        <Media heading>
                            Property Address: { user.properties[key].address }
                        </Media>
                        <Media className="lead">
                            Headline: { user.properties[key].headline }
                        </Media>
                        { user.properties[key].descripn }
                    </Media>
                    <hr/>
                </div>)
            } else {
                unbookedList.push(
                    <div>
                        <Media body>
                        <Media heading>
                            Property Address: { user.properties[key].address }
                        </Media>
                        <Media className="lead">
                             { user.properties[key].headline }
                        </Media>
                        Property Description: { user.properties[key].descripn }
                    </Media>
                    <hr/>
                </div>)
            }
        }    
        return(
            <div>
                {redirectVar}
                <OwnerNavbar />
                <Jumbotron>
                    <h3 className="display-6">Hello! Your properties are listed below:</h3>
                    <hr className="my-2" />
                </Jumbotron>
                <div style={{margin: 50}}>
                    <p className="lead">Booked Properties: </p>
                    {bookedList}
                </div>

                <div style={{margin: 50}}>
                    <p className="lead">Unbooked Properties: </p>                    
                    {unbookedList}

                </div>
                
            </div>
        );
    }
}

OwnerDashboard.propTypes = {
    getUser: PropTypes.func.isRequired,
    getImages: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    images: state.images
});

export default connect(mapStateToProps, { getImages, getUser })(OwnerDashboard);