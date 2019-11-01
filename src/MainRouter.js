import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Signup from './components/user/SignUp';
import Signin from './components/user/Signin';
import Profile from './components/user/Profile';
import Users from './components/user/Users';
import EditProfile from './components/user/EditProfile';
import PrivateRoute from './auth/PrivateRoute';

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/users" component={Users} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute exact path="/user/:userId" component={Profile} />
    </Switch>
  </div>
);

export default MainRouter;
