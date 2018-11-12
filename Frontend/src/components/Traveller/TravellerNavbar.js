import React, {Component} from 'react';
import { Redirect } from 'react-router';
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser, getUser } from '../../actions/userActions';

class TravellerNavbar extends Component{
    componentDidMount() {
        var email = localStorage.getItem('email');
        if(email) {
            this.props.getUser();
        }
    }
    state = {
        isOpen: false
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    handleLogout = () => {
        this.props.logoutUser();
    }
    render(){
        const { user } = this.props.user; 
        var check = false;
        if(localStorage.getItem('email')) {
            check = true;
        } else {
            check = false;
        }
        let navLogin = null;
        if(user) {
            console.log("User is Logged in");
            navLogin = (
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        {user.firstName}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <NavLink href="/travdash">Dashboard</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/profile">Profile</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/travinbox">Inbox</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink href="/travlogin" onClick={this.handleLogout}>Logout</NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        } else if(!user) {
            // Else display login button
            console.log("User is logged out");
            navLogin = (
                <NavItem>
                    <NavLink href="/ownerlogin">
                        Owner Login
                    </NavLink>
                </NavItem>
            )
        }
        return(
            <div>
                <Navbar color="light" light expand="sm" className="mb-5">
                    <Container>
                        <NavbarBrand href="#">
                            <img 
                                src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg" 
                                alt="Header logo" 
                            />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {navLogin}
                                <NavItem>
                                    <img 
                                        src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg" 
                                        className='header-nav-birdhouse_img' 
                                        alt="birdhouse logo"
                                    />
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
        </div>
        )
    }
}

TravellerNavbar.propTypes = {
    getUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, { logoutUser, getUser })(TravellerNavbar);