import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SignIn} />
        <Route path="/register" exact component={SignUp} />
        <Route path="/dashboard" isPrivate component={Dashboard} />
        <Route path="/profile" isPrivate component={Profile} />

        {/* <Route path="/" component={() => <h1>404</h1>} /> */}
      </Switch>
    </BrowserRouter>
  );
}
