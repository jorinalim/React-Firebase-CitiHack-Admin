import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from './App';
import Vouchers from './Vouchers';
import Transaction from './Transaction';
import SignIn from './signin';

const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/' component={SignIn}></Route>
      <Route exact path='/vouchers' component={Vouchers}></Route>
      <Route exact path = '/transactions' component = {Transaction}></Route> 
    </Switch>
  );
}

export default Main;