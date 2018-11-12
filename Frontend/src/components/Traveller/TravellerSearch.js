import React, {Component} from 'react';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import OwnerNavbar from './TravellerNavbar';
import {
    Jumbotron,
    Media,
    Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImages, getUser } from '../../actions/userActions';

class TravellerSearch extends Component{
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
            redirectVar = <Redirect to= "/travlogin"/>
        }
        
        const { user } = this.props.user;
        let list = [];
        for (var key in user.properties) {
            list.push(

                <div>
                    <Media>
                        <Media left>
                            <Button right>Book Property</Button>
                        </Media>
                        <Media style={{marginLeft: 50}} body>
                            <Media heading>
                                Property Address: { user.properties[key].address }
                            </Media>
                            <Media className="lead">
                                    { user.properties[key].headline }
                            </Media>
                        Property Description: { user.properties[key].descripn }
                        </Media>
                        
                    </Media>
                <hr/>
                </div>)
       
        }
            
        return(
            <div>
                {redirectVar}
                <OwnerNavbar />
                <Jumbotron>
                    <h3 className="display-6">Properties that matched your search</h3>
                    <hr className="my-2" />
                </Jumbotron>
                <div style={{margin: 50}}>
                    {list}
                </div>

            </div>
        );
    }
}

TravellerSearch.propTypes = {
    getUser: PropTypes.func.isRequired,
    getImages: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    images: state.images
});

export default connect(mapStateToProps, { getImages, getUser })(TravellerSearch);