import React, { Component } from 'react';
import bgImg from '../../images/bgimg.jpg';
import logo from '../../images/homeaway-logo.svg';
import usFlag from '../../images/us-flag.png';
import {Link} from 'react-router-dom';
import { Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import axios from 'axios';
import {Redirect} from 'react-router';
import {
  Jumbotron,
  Media
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getImages, getUser, searchProperties } from '../../actions/userActions';

class TravellerDashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      search:"",
      startDate: Date(),
      endDate: Date(),
      accom:"",
      redirectFlag: false
    };
  }
  

  handleStartDateChange = (date) => {
      this.setState({
        startDate: date
      })
      if(this.state.endDate<date){
        document.getElementById('endDate').value=date;
      }
  }
  handleEndDateChange = (date) => {
    if(date<this.state.startDate){
      document.getElementById('endDate').selected = this.state.startDate;
    }else{
      this.setState({
        endDate: date
      })
    }
}

handleSearch = (e) => {
  this.setState({
    search: e.target.value
  })
}

handleAccom = (e) => {
  this.setState({
    accom: e.target.value
  })
}

handleSubmit = (e) => {
  var data = {
    search: this.state.search,
    startDate: this.state.startDate,
    endDate: this.state.endDate,
    accom: this.state.accom
  }
  axios.post('http://localhost:3001/create',data)
    .then(response => {
        if(response.status == 200){
            this.setState({
                redirectFlag: true
            })
        }else{
            this.setState({
              redirectFlag:false
            })
            console.log('No records Found');
        }
    })
}

  render() {
    let redirect = null;
        if(this.state.redirectFlag){
            redirect = <Redirect to= "/searchlist"/>
        }
        const { user } = this.props.user;
        let list = [];
        for (var key in user.properties) {
            list.push(
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
    
    return (
      <div id="root">
        {redirect}
        <div className="bgImg" style={{backgroundImage: "url(" + bgImg + ")"}}>
          <div className="header">
            <div className="header-logo">
              <img src={logo} id="header-logo" alt="Homeaway Logo" />
            </div>
            <div className="header-nav">
              <div className="header-nav-flag">
                <img src={usFlag} id="usFlag" alt="US Flag" />
              </div>
              <div className="header-nav-dropdown">
                <UncontrolledDropdown setActiveFromChild>
                  <DropdownToggle tag='a' className='nav-link' caret>
                    Login
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag='a' href='/travdash'>Dashboard</DropdownItem>
                    <DropdownItem tag='a' href='/travdash'>Dashboard</DropdownItem>
                    <DropdownItem tag='a' href='/travinbox'>Inbox</DropdownItem>
                    <DropdownItem tag='a' href='/travdash'>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              <div className="header-nav-birdhouse">
                <img src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg" className='header-nav-birdhouse_img' alt="birdhouse logo" />
              </div>
            </div>
          </div>
          <div className="Jumbotron">
            <div className="Jumbotron_wrapper">
              <div className="Jumbotron_content">
                <h1 className="Headline">
                  <span className="Headline_text">Book beach houses,cabins</span>
                  <span className="Headline_text">condos and more worldwide</span>
                </h1>
                <div className="search_container">
                <p id="date_errors" className="danger"></p>
                  <form>
                    <div className="form-row align-items-center">
                      <div className="col-auto">
                        <input type="text" onChange={this.handleSearch.bind(this)} class="form-control mb-2" name="search" placeholder="Where do you want to go?"/>
                      </div>
                      <div className="col-auto">
                        <input type="date" id="startDate" /* onChange={this.handleStartDateChange.bind(this)} *//>
                      </div>
                      <div className="col-auto">
                        <input type="date" id="endDate" /* onChange={this.handleEndDateChange.bind(this)} */ />
                      </div>
                      <div className="col-auto">
                        <input type="number" onChange={this.handleAccom.bind(this)} class="form-control mb-2" name="no_guest" placeholder="Number of Guests" min="1" />
                      </div>
                      <div class="col-auto">
                        <button type="submit" onClick={this.handleSubmit.bind(this)} class="btn btn-primary mb-2" style={{background: 'blue', color: 'white'}}>Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {list}
      </div>
    );
  }
}

TravellerDashboard.propTypes = {
  searchProperties: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { searchProperties, getUser })(TravellerDashboard);