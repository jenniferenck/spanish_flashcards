import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';
import UserHomePage from './UserHomePage/index';
import DashBoard from './DashboardPage';
 
    class Routes extends Component {
        render() {
            return(
                <Switch>
                <Route exact path="/" render={() => <UserHomePage />} />
                <Route exact path="/dashboard" render={() => <DashBoard />} />
              </Switch>
            );
        }
    }
 
export default Routes;