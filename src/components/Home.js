import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

export default function Home(props) {
  return (
    <div id="Home">
      <div>
        <img src="/images/logo.png" alt="Logo" /> 
        <p className="brand-name">Flo Horses</p>
      </div>
      { props.loggedInUser ? 
        <div className="auth-buttons">
        <Link className="button btn-orange" to="/horses">
          Mes chevaux
        </Link>
        <Link className="button btn-bordeaux" to="/horses/create">
          Ajouter un cheval
        </Link>
      </div> 
      : 
      <div className="auth-buttons">
        <Link className="button btn-orange" to="/login">
          Se connecter
        </Link>
        <Link className="button btn-bordeaux" to="/signup">
          S'inscrire
        </Link>
      </div>}
      <div className="intro-text">Gardez une trace de tous les chevaux avec lesquels vous avez travaillé, ajoutez des notes pour chaque étape de leur développement et retrouvez facilement chaque cheval.</div>
    </div>
  );
}
