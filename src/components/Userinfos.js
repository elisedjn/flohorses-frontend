import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './styles/Userinfos.css';

export default function Userinfos(props) {
  const [showWarning, setShowWarning] = useState(false);

  if(props.loggedInUser){
    const {username, email} = props.loggedInUser
  return (
    <div id="UserInfos">
      <h1>Paramètres</h1>
      <form onSubmit={props.onEdit}>
        <input className="username" id="username" name="username" type="string" defaultValue={username} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue={email} />
        <label htmlFor="password">Mot de passe actuel</label>
        <input id="password" name="password" type="password" placeholder="********" />
        <label htmlFor="newPassword">Nouveau mot de passe</label>
        <input id="newPassword" name="newPassword" type="password" placeholder="********" />
        <button className="btn-orange small-button" type="submit">Valider les changements</button>
      </form>
      <button className="btn-bordeaux small-button" onClick={()=>setShowWarning(true)}>Supprimer mon compte</button>
      <Modal
        show={showWarning}
        onHide={() => setShowWarning(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Êtes-vous sûr?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Cette action supprimera votre compte et tous les chevaux associés. <br/> Cette action est irréversible.</Modal.Body>
        <Modal.Footer>
          <Button className="small-button btn-bordeaux" onClick={() => setShowWarning(false)}>
            Annuler
          </Button>
          <Button className="small-button btn-orange" onClick={props.onDelete}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  } else {
    return <div>Loading</div>
  }
}
 