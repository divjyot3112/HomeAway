import React from 'react';
import OwnerNavbar from './OwnerNavbar';
import {Redirect} from 'react-router';
import {
    Button,  
    Input, 
    Label, 
    Form, 
    FormGroup,
    Jumbotron
} from 'reactstrap';
import { postProperty } from '../../actions/userActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class PostProperty extends React.Component {
  state = {
    address:"",
    headline: "",
    descripn:"",
    ptype: "",
    bedrooms: "",
    minstay: "",
    accom: "",
    price: "",
    startDate: "",
    endDate: "",
    email: ""
  }
  componentDidMount() {
    this.setState({
      email: localStorage.getItem('email')
    })
  }
  onChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }
  onSubmit = (e) => {
    e.preventDefault();
    if(!this.state.address||
      !this.state.headline||
      !this.state.descripn||
      !this.state.ptype||
      !this.state.bedrooms||
      !this.state.minstay||
      !this.state.accom||
      !this.state.price||
      !this.state.startDate||
      !this.state.endDate) {
        console.log(this.state)
      window.alert("All fields are required");
    } else {
      var data = {
        email: this.state.email,
        address : this.state.address,
        headline: this.state.headline,
        descripn:this.state.descripn,
        ptype: this.state.ptype,
        bedrooms: this.state.bedrooms,
        minstay: this.state.minstay,
        accom: this.state.accom,
        price: this.state.price,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }
    this.props.postProperty(data);
    }
  }

  render(){
        let redirectVar = null;

        if(!localStorage.getItem('email') || localStorage.getItem('flag')!=='o'){
            redirectVar = <Redirect to= "/ownerlogin"/>
        }

        let redirectVarImg = null;

        if(localStorage.getItem('propertyFlag')){
            redirectVarImg = <Redirect to= "/postimages"/>
        }

    return(
    <div>
    {redirectVar}
    {redirectVarImg}
    <OwnerNavbar />
      <div className="listing-content">
        <div className="listing-navbar">
        
          <div className="nav flex-column">
            <a className="nav-link" href="#location">Property Location</a>
            <a className="nav-link" href="#details">Details</a>
            <a className="nav-link" href="#pricing">Pricing</a>
            <a className="nav-link" href="#availability">Availability</a>
          </div>
        </div>

        <Form onSubmit={this.onSubmit} encType='multipart/form-data'>

        <section className="panel-listing">
          <Jumbotron>
            <h3 className="display-6">List your Property</h3>
          </Jumbotron>
          <a name="location"><div id="location" className="panel panel-dashboard">
            <div class="panel-heading">Verify the location of your rental</div>
              <div className="panel-body">
                <FormGroup>
                <Input type="text" onChange={this.onChange} name="address" placeholder="Address" />
                </FormGroup>
              </div>               
            </div></a>

          <a name="details"><div id="details" className="panel panel-dashboard">
            <div className="panel-heading">Describe Your Property</div>
              <div className="panel-body">
                <FormGroup>
                  <Label>*10-50 Characters</Label>
                <Input type="text" onChange={this.onChange} name="headline" placeholder="Headline"  />
                </FormGroup>
                <FormGroup>
                <Input type='text' onChange={this.onChange} name="descripn" style={{width: '100%', height: 80}} placeholder="Property Description" />
                </FormGroup>
                <FormGroup>
                <Input type="text" onChange={this.onChange} placeholder="Property Type" name="ptype" />
                </FormGroup>
                <FormGroup>
                <Input type="number" onChange={this.onChange} placeholder="Bedrooms" name="bedrooms" min="1" />
                </FormGroup>
                <FormGroup>
                <Input type="number" onChange={this.onChange} placeholder="Accomodates" name="accom" min="2" />
                </FormGroup>              
              </div>
            </div></a>

          <a name="pricing"><div id="pricing" className="panel panel-dashboard">
          <div className="panel-heading">Pricing</div>
              <div className="panel-body">
                  <FormGroup>
                    <Input type="text" onChange={this.onChange} name="price" placeholder="Base Price" pattern="^\d+$" />
                  </FormGroup>
                  <FormGroup>
                    <Input type="number" onChange={this.onChange} name="minstay" className="form-control" placeholder="Minimum Stay" min="1" />
                  </FormGroup>
              </div>
          </div></a>

          <a name="availability"><div id="availability" className="panel panel-dashboard">
          <div className="panel-heading">Availability</div>
              <div className="panel-body">
                  <FormGroup> 
                    Start Date: 
                    <Input type="date" id="startDate" onChange={this.onChange} name="startDate" />
                  </FormGroup>
                  <FormGroup>  
                    End Date: 
                    <Input type="date" id="endDate" onChange={this.onChange} name="endDate" />
                  </FormGroup>
              </div>
          </div></a>

          <FormGroup>
            <Button type="submit" className="btn btn-primary">Done!</Button> 
          </FormGroup>
        </section>
        </Form>
      </div>
    </div>
    )
  }
}

PostProperty.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  flag: state.postpropFlag
});

export default connect(mapStateToProps, {postProperty})(PostProperty);