import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

import Footer from "./Footer";

export default function Home() {
  return (
    <div id="Home">
      <div>
        <img src="/images/logo.png" alt="Logo" /> 
        <p className="brand-name">Flo Horses</p>
      </div>
      <div className="auth-buttons">
        <Link className="button btn-orange" to="/login">
          Se connecter
        </Link>
        <Link className="button btn-bordeaux" to="/signup">
          S'inscrire
        </Link>
      </div>
      <div className="intro-text">Gardez une trace de tous les chevaux avec lesquels vous avez travaillé, ajoutez des notes pour chaque étape de leur développement et retrouvez facilement chaque cheval.</div>
      <Footer />
    </div>
  );
}
