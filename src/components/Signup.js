import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function Signup(props) {
  return (
    <div id="signup">
      <div>
        <Link to='/' ><img src="" alt="Logo" /></Link>
      </div>
      <Form className="" onSubmit={props.onSignUp}>
        <Form.Group>
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control type="string" placeholder="Flo" name="username" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="flo@love.fr" name="email" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control type="password" placeholder="******" name="password" />
        </Form.Group>

        <div className="loginBtn">
          <Button className="loginBtnClick" variant="primary" type="submit">
           Créer un compte
          </Button>
        </div>

        <Form.Text className="small-text">
          Déjà inscrit? <Link to="/login">Se connecter</Link>
        </Form.Text>
        
      </Form>
      
    </div>
  )
}
