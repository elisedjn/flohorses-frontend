import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../config";

import {Modal, Button} from 'react-bootstrap';
import "./styles/CreateHorse.css";

export default function CreateHorse(props) {
  const [imageSrc, setImageSrc] = useState("/images/addimage.png");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Une erreur s'est produite. Merci de réessayer.")

  const handleCreateHorse = (e) => {
    e.preventDefault();
    const {
      name,
      sex,
      birthdate,
      father,
      mother,
      owner,
      breeder,
      generalNotes,
    } = e.currentTarget;
    const newHorse = {
      name: name.value,
      birthdate: birthdate.value,
      sex: sex.value,
      father: father.value,
      mother: mother.value,
      owner: owner.value,
      breeder: breeder.value,
      generalNotes: generalNotes.value,
      pictures: imageSrc,
    };
    axios
      .post(`${API_URL}/horses/${props.loggedInUser._id}/create`, newHorse, {
        withCredentials: true,
      })
      .then((res) => {
        props.history.push(`/horses/${res.data._id}`);
      })
      .catch((err) => {
        console.log("Creating a horse", err.response.data);
        setShowError(true);
        if(err.response.data.errorMessage.errors.name.kind === "required" && err.response.data.errorMessage.errors.name.path === "name") setErrorMessage("Merci de saisir le nom du cheval.")

      });
  };

  const handleImage = (e) => {
    setImageSrc("/images/loading.gif")
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.files[0]);
    axios
      .post(`${API_URL}/upload`, uploadData, { withCredentials: true })
      .then((imagePath) => {
        setImageSrc(imagePath.data.image);
      })
      .catch((err) => {
        setShowError(true)
        console.log("Uploading picture for new horse", err)
      });
  };

  return (
    <>
    <form id="CreateHorse" onSubmit={handleCreateHorse}>
      <div className="top-part">
        <div className="add-image">
          <input
            onChange={handleImage}
            type="file"
            id="picture"
            name="picture"
            accept="image/*"
          />
          <label htmlFor="picture" className="btn-1">
            {" "}
            <img src={imageSrc} alt="Ajouter" />
          </label>
        </div>
        <div className="identity">
          <h2>
            <input
              className="input-name"
              type="text"
              placeholder="Nom"
              name="name"
            />
          </h2>
          <div className="field">
            <label htmlFor="sex">Sexe :</label>
            <select className="big-input" id="sex" name="sex">
              <option value="Femelle">Femelle</option>
              <option value="Mâle">Mâle</option>
              <option value="Hongre">Hongre</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="birthdate">Né(e) le:</label>
            <input
              className="big-input"
              type="date"
              name="birthdate"
              id="birthdate"
            />
          </div>
        </div>
      </div>
      <div className="dividers">
        <Tabs defaultActiveKey="infos-tab">
          <Tab eventKey="infos-tab" title="Infos">
            <div className="field">
              <label htmlFor="father">Par </label>
              <input
                className="small-input"
                type="string"
                name="father"
                id="father"
                placeholder="Père"
              />
              <label htmlFor="mother">et</label>
              <input
                className="small-input"
                type="string"
                name="mother"
                id="mother"
                placeholder="Mère"
              />
            </div>
            <div className="field">
              <label htmlFor="breeder">Éleveur : </label>
              <input
                className="big-input"
                type="string"
                name="breeder"
                id="breeder"
              />
            </div>
            <div className="field">
              <label htmlFor="owner">Propriétaire : </label>
              <input
                className="big-input"
                type="string"
                name="owner"
                id="owner"
              />
            </div>
            <div className="field">
              <label htmlFor="generalNotes">Notes : </label>
              <textarea
                className="notes textarea"
                name="generalNotes"
                id="generalNotes"
              />
            </div>
          </Tab>
        </Tabs>
      </div>
      <button className="small-button btn-orange" type="submit">
        Valider
      </button>
    </form>
    <Modal
        show={showError}
        onHide={() => setShowError(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Oops...</Modal.Title>
        </Modal.Header>
        <Modal.Body>{errorMessage}</Modal.Body>
        <Modal.Footer>
          <Button className="small-button btn-orange" onClick={() => setShowError(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}
