import React from 'react';
import OwnerNavbar from './OwnerNavbar';
import {Redirect} from 'react-router';
import {
    Jumbotron,
    Alert,
    Button,  
    Input, 
    Label, 
    Form, 
    FormGroup
} from 'reactstrap';
import { postImages, getUser } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PostImages extends React.Component {
    state = {
        images: [],
        imageFlag: false,
        danger: false,
        warning: false,
        info: false,
    }
    componentDidMount() {
        this.props.getUser();
        const { user } = this.props.user;
        console.log('user - ', user);
        console.log('properties - ', user.properties);
        this.setState({
            email: user.email,
        })
    }
    onChange = (e) => {
        console.log(e.target.files);
        this.setState({
            warning: false
        })
        var files = e.target.files;
        for(let i=0; i<files.length; i++) {
            if (this.state.images.length < 5) {
                this.setState({
                    info: false
                });
                var ext = files[i].name.substr(files[i].name.lastIndexOf('.') + 1);
                if(ext==='jpg' || ext==='jpeg' || ext==='png'){
                    this.state.images.push(files[i]);
                    document.getElementById('Images').innerHTML += files[i].name + '<br/>';
                } else {
                    this.setState({
                        info: true
                    })
                }
            } else {
                this.setState({
                    danger: true
                });
                break;
            }
        }
        console.log(this.state.images);
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.images.length===0) {
            this.setState({
                warning: true
            })
        } else {
            console.log(this.state.images)
            let images = new FormData(); 
            images.append('currentPropertyId', this.state.currentPropertyId);
            images.append('email', this.state.email);       
            this.state.images.map(image => {
            images.append('images', image)
            });
            console.log("formdata:",images);
            this.props.postImages(images);
        }
    }
    onReset = (e) => {
        this.setState({
            images: [],
            danger: false
        })
        document.getElementById('Images').innerHTML = "Selected Images (Max 5):<br />"
    }
    render(){
        let redirectVar = null;

        if(!localStorage.getItem('email')){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }

        let redirectVarImg = null;

        if(!localStorage.getItem('propertyFlag')){
            redirectVar = <Redirect to= "/ownerdash"/>
        }

        return(
            <div>
                {redirectVar}
                {redirectVarImg}
                <OwnerNavbar />
                <div className="panel-body">
                    <Jumbotron>
                        <h2 style={{textAlign: "center"}} className="display-6">Upload images for your property!</h2>
                    </Jumbotron>
                    <FormGroup>
                        <input id="file" name="images" type="file" onChange={this.onChange} required multiple />
                    </FormGroup>
                    <Alert 
                        isOpen={this.state.danger} 
                        color="danger"
                    >
                        Only 5 images allowed
                    </Alert>
                    <Alert 
                        isOpen={this.state.warning} 
                        color="warning"
                    >
                        Select atleast one Image
                    </Alert>
                    <Alert
                        isOpen={this.state.info}
                        color="info"
                    >
                        Only JPG and PNG images allowed
                    </Alert>
                    <div style={{ marginBottom: 15 }} id="Images">
                        Selected Images (Max 5): <br />
                    </div>
                    <FormGroup>
                        <Button onClick={this.onSubmit} color="primary">Post!</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.onReset} color="secondary">Reset</Button>
                    </FormGroup>
                </div>
            </div>
        )
    }
}

PostImages.propTypes = {
    getUser: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    properties: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    properties: state.properties
});

export default connect(mapStateToProps, { getUser, postImages })(PostImages);