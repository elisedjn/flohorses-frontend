import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";
import { API_URL } from "./config";
import "./App.css";

//Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NavBar from './components/NavBar';
import Horses from './components/Horses';
import Footer from "./components/Footer";
import OneHorse from "./components/OneHorse";
import Galery from "./components/Galery";
import CreateHorse from './components/CreateHorse';
import Userinfos from "./components/Userinfos";

function App(props) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    if(!loggedInUser){
      axios.get(`${API_URL}/auth/user`, {withCredentials:true})
        .then((res) => {
          axios.get(`${API_URL}/user/${res.data._id}`, {withCredentials:true})
            .then((user) => setLoggedInUser(user.data))
        })
    }
  }, [loggedInUser])

  const handleSignUp = (e) => {
    e.preventDefault();
    const { username, email, password } = e.currentTarget;
    axios
      .post(
        `${API_URL}/auth/signup`,
        {
          username: username.value,
          email: email.value,
          password: password.value,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setLoggedInUser(res.data);
        props.history.push("/horses");
      })
      .catch((err) => console.log("Handle Sign Up", err));
  };

  const handleLogIn = (e) => {
    e.preventDefault();
    const { email, password } = e.currentTarget;
    axios
      .post(`${API_URL}/auth/login`,
      {
        email: email.value,
        password: password.value,
      },
      { withCredentials: true })
      .then((res) => {
        setLoggedInUser(res.data);
        props.history.push("/horses");
      })
      .catch((err) => console.log("LogIn", err));
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    const {username, email, password, newPassword} = e.currentTarget;
    const updatedInfos = {
      username : username.value,
      email: email.value,
      password: password.value,
      newPassword: newPassword.value
    }
    axios.patch(`${API_URL}/user/${loggedInUser._id}`, updatedInfos, {
      withCredentials: true,
    }) 
      .then(() => {
        let updatedUser = JSON.parse(JSON.stringify(loggedInUser))
        updatedUser.username = username.value;
        updatedUser.email = email.value;
        setLoggedInUser(updatedUser);
        props.history.push("/horses");
      })
      .catch((err)=> console.log(err))

  }

  const handleDeleteUser = () => {
    axios.delete(`${API_URL}/user/${loggedInUser._id}`, {
      withCredentials: true,
    })
    .then((response)=> {
      setLoggedInUser(null)
      props.history.push("/")
    })
    .catch((err) => console.log(err))
  }

  const handleLogOut = () => {
    axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setLoggedInUser(null);
        props.history.push('/')
      })
  }

  return (
    <div className="App">
        {loggedInUser && <NavBar onLogOut = {handleLogOut} />}
        <Switch>
          <Route exact path="/" render={(routeProps) => {
            return <Home loggedInUser = {loggedInUser} {...routeProps} />
          }} />
          <Route
            path="/login"
            render={(routeProps) => {
              return <Login onLogIn={handleLogIn} {...routeProps} />;
            }}
          />
          <Route
            path="/signup"
            render={(routeProps) => {
              return <Signup onSignUp={handleSignUp} {...routeProps} />;
            }}
          />
          <Route exact path="/horses" render={(routeProps) => {
            return <Horses loggedInUser = {loggedInUser} {...routeProps} />;
          }} />
          <Route exact path="/horses/create" render={(routeProps) => {
            return <CreateHorse loggedInUser = {loggedInUser} {...routeProps} />;
          }} />
          <Route exact path="/horses/:horseID" render={(routeProps) => {
            return <OneHorse loggedInUser = {loggedInUser} {...routeProps} />;
          }} />
          <Route exact path="/horses/:horseID/pictures" render={(routeProps) => {
            return <Galery loggedInUser = {loggedInUser} {...routeProps} />
          }} />
          <Route path="/account" render={(routeProps) => {
            return <Userinfos loggedInUser = {loggedInUser} onEdit={handleEditUser} onDelete={handleDeleteUser} {...routeProps} />
          }} />
        </Switch>
        <Footer />
    </div>
  );
}

export default withRouter(App);
