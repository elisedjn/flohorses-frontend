import React from 'react';
import { Link } from "react-router-dom";
import "./styles/NavBar.css";

export default function NavBar(props) {
  return (
    <div id="NavBar">
      <div><Link to="/"><img className="logo-img" src="/images/logo.png" alt = "Logo" /></Link></div>
      <div className="add-horse"><Link to="/horses/create">+<img className="horse-img" src="/images/horse.png" alt="Cheval" /></Link></div>
      <div><Link to="/horses">Mes Chevaux</Link></div>
      <div><Link to="/account"><img src="/images/settings.png" alt="Settings" /></Link></div>
      <button onClick={props.onLogOut}><img src="/images/logout.png" alt="Logout" /></button>
    </div>
  )
}
