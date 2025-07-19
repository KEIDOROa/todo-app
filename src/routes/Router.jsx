import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Sidebar } from '~/components/Sidebar';
import Home from '~/pages/index.page';
import NotFound from '~/pages/404';
import SignIn from '~/pages/signin/index.page';
import NewList from '~/pages/list/new/index.page';
import SignUp from '~/pages/signup/index.page';
import ListIndex from '~/pages/lists/[listId]/index.page';

export const Router = () => {
  const auth = useSelector(state => state.auth.token !== null);

  return (
    <BrowserRouter>
      <Sidebar />
      <div className="main_content">
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          {auth ? (
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/lists/:listId" component={ListIndex} />
              <Route exact path="/list/new" component={NewList} />
            </Switch>
          ) : (
            <Redirect to="/signin" />
          )}
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
