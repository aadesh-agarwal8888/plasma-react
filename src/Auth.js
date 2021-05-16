import decode from "jwt-decode";
import axios from "axios";
import config from "./Components/config";
import { Redirect } from "react-router";
import Cookies from "js-cookie";


export default class AuthService {
  // Initializing important variables
  constructor() {
    axios.defaults.withCredentials = true;

    // axios.defaults.headers.common["Authorization"] = this.loggedIn()
    //   ? "Bearer " + this.getToken()
    //   : "";

  }

  login = (email, password) => {
    // Get a token from api server using the fetch api
    console.log(email, password, "login");
    return axios
      .post(`${config.baseUrl}/login`, {
        email_address: email,
        password: password
      })
      .then(res => {
        // console.log(res.data.token); // Setting the token in localStorage
        // this.setToken(res.data.token); // Setting the token in localStorage
        console.log(res);
        return Promise.resolve(res);
      })
      .catch(() => {
        return Promise.reject("Email or Passowrd incorrect!");
      });
  };

  logout = () => {
    Cookies.remove("token");
  }

  checkCookie = () => {
    return axios.get(config.baseUrl).then(res => {
      return Promise.resolve("Cookie valid");
    }).catch(err => {
      this.logout()
      return Promise.reject("Cookie Invalid");
    })
  }

  // loggedIn = () => {
  //   // Checks if there is a saved token and it's still valid
  //   const token = this.getToken(); // GEtting token from localstorage
  //   console.log(token, "token");
  //   return !!token && !this.isTokenExpired(token); // handwaiving here
  // };

  // isTokenExpired(token) {
  //   try {
  //     const decoded = decode(token);
  //     if (decoded.exp < Date.now() / 1000) {
  //       // Checking if token is expired. N
  //       return true;
  //     } else return false;
  //   } catch (err) {
  //     return false;
  //   }
  // }

  // setToken = idToken => {
  //   // Saves user token to localStorage
  //   localStorage.setItem("jwt_token", idToken);
  // };

  // getToken = () => {
  //   // Retrieves the user token from localStorage
  //   return localStorage.getItem("jwt_token");
  // };

  // logout = () => {
  //   // Clear user token and profile data from localStorage
  //   localStorage.removeItem("jwt_token");
  // };

  // getProfile = () => {
  //   // Using jwt-decode npm package to decode the token
  //   return decode(this.getToken());
  // };

  // getRole = () => {
  //   // Using jwt-decode npm package to decode the token
  //   return decode(this.getToken()).role;
  // };
}
