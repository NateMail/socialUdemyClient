import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Signup from './components/user/SignUp';
import Signin from './components/user/Signin';
import Profile from './components/user/Profile';

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/user/:userId" component={Profile} />
    </Switch>
  </div>
);

export default MainRouter;
