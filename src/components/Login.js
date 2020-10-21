import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import "./styles/Auth.css";

export default function Login(props) {
  return (
    <div className="auth">
      <div>
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" />
          <p className="brand-name">Flo Horses</p>
        </Link>
      </div>
      <Form className="auth-form" onSubmit={props.onLogIn}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="flo@love.fr" name="email" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="******" name="password" />
        </Form.Group>

        <div className="loginBtn">
          <Button
            className="loginBtnClick small-button btn-bordeaux"
            variant="primary"
            type="submit"
          >
            Se connecter
          </Button>
        </div>

        <Form.Text className="small-text">
          Pas encore inscrit? <Link to="/signup">Créer un compte</Link>
        </Form.Text>
      </Form>
    </div>
  );
}
