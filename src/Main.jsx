import React, { Component } from "react";
import AuthService from "./Auth";
import config from "./Components/config";
import SignIn from "./SignIn";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import App from "./App";
import axios from "axios";
import Cookies from "js-cookie";
import Loading from "./Components/Loading"


class Main extends Component {
  state = {
    loading: true,
    loggedIn: false
  };

  componentDidMount() {
    // toast.configure({
    //     autoClose: 3000,
    // })
    // new AuthService().logout();
    // console.log("main");
    new AuthService().checkCookie().then(res => {

      this.setState({
        loading: false,
        loggedIn: true
      });
    }).catch(err => {

    })
    this.setState({
      loading: false,
      loggedIn: false
    });

  }

  login = (username, password) => {
    this.setState({
      loading: true,
      loggedIn: false
    })
    new AuthService()
      .login(username, password)
      .then((res) => {
        console.log(res);

        this.setState({
          loading: false,
          loggedIn: true
        });
        // toast.info('Login successful!');
      })
      .catch(() => {
        // toast.error('Email or password incorrect!');
        this.setState({
          loading: false,
          loggedIn: false
        });
      });
  };

  render() {
    // if (this.state.loading) {
    //   return (
    //     <Loading loadingMsg={"Logging In..."}></Loading>
    //   );
    // }

    return (
      <Switch>
        <ProtectedLogin path="/login" component={SignIn} isLoggedIn={this.state.loggedIn} login={this.login}></ProtectedLogin>
        <ProtectedRoute path="/" component={AppComponent} isLoggedIn={this.state.loggedIn}></ProtectedRoute>
      </Switch>

    );
  }
}
const AppComponent = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

const ProtectedRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={() => isLoggedIn ? (
      <Component></Component>
    ) : (
      <Redirect to="/login"></Redirect>
    )
    }></Route>
  )
}


const ProtectedLogin = ({ isLoggedIn, login, component: Component, ...rest }) => {
  return (
    <Route {...rest} render={() => !isLoggedIn ? (
      <Component login={login}></Component>
    ) : (
      <Redirect to="/"></Redirect>
    )
    }></Route>
  )
}

export default Main;
