import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import OwnerDashboard from './Owner/OwnerDashboard';
import OwnerInbox from './Owner/OwnerInbox';
import OwnerLogin from './Owner/OwnerLogin';
import OwnerSignup from './Owner/OwnerSignup';
import PostProperty from './Owner/PostProperty';
import PostImages from './Owner/PostImages';

import Profile from './Traveller/Profile';
import TravellerBook from './Traveller/TravellerBook';
import TravellerDashboard from './Traveller/TravellerDashboard';
import TravellerInbox from './Traveller/TravellerInbox';
import TravellerLogin from './Traveller/TravellerLogin';
import TravellerSearch from './Traveller/TravellerSearch';
import TravellerSignup from './Traveller/TravellerSignup';

class Main extends Component {
    render(){
        return(
            <div>

                <Route path="/" component={OwnerLogin} exact/>

                <Route path="/ownerdash" component={OwnerDashboard} />
                <Route path="/ownerinbox" component={OwnerInbox} />
                <Route path="/ownerlogin" component={OwnerLogin} />
                <Route path="/ownersignup" component={OwnerSignup} />
                <Route path="/postimages" component={PostImages} />
                <Route path="/postprop" component={PostProperty} />

                <Route path="/profile" component={Profile} />
                <Route path="/travbook" component={TravellerBook} />
                <Route path="/travinbox" component={TravellerInbox} />
                <Route path="/travlogin" component={TravellerLogin} />
                <Route path="/travsignup" component={TravellerSignup} />
                <Route path="/travdash" component={TravellerDashboard} />
                <Route path="/travsearch" component={TravellerSearch} />
                
            </div>
        )
    }
}

export default Main;