import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import axios from 'axios';
import { API_URL } from "../config";

import './styles/CreateHorse.css'

export default function CreateHorse(props) {

  const handleCreateHorse = (e) => {
    e.preventDefault();
    const {name, sex, birthdate, father, mother, owner, breeder, generalNotes } = e.currentTarget;
    const newHorse = {
      name : name.value,
      birthdate: birthdate.value,
      sex: sex.value,
      father: father.value,
      mother: mother.value,
      owner: owner.value,
      breeder: breeder.value,
      generalNotes: generalNotes.value
    }
    console.log(newHorse)
    axios.post(`${API_URL}/horses/${props.loggedInUser._id}/create`, newHorse, {withCredentials: true})
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log("Creating a horse", err))
  }

  return (
    <form id="CreateHorse" onSubmit={handleCreateHorse}>
      <div className="top-part">
        <div>
          <label htmlFor="picture">Ajouter une image</label>
          <input type="file" id="picture" name="picture" accept="image/*" />
        </div>
        <div>
          <h2>
            <input type="text" placeholder="Nom" name="name" />
          </h2>
          <div>
            <label htmlFor="sex">Sexe</label>
            <select id="sex" name="sex" size="3">
              <option value="Femelle">Femelle</option>
              <option value="Mâle">Mâle</option>
              <option value="Hongre">Hongre</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthdate">Né(e) le:</label>
            <input type="date" name="birthdate" id="birthdate" />
          </div>
        </div>
      </div>
      <div className="dividers">
        <Tabs defaultActiveKey="infos-tab" id="uncontrolled-tab-example">
          <Tab eventKey="infos-tab" title="Infos">
            <div>
              <label htmlFor="father">Père : </label>
              <input type="string" name="father" id="father" />
            </div>
            <div>
              <label htmlFor="mother">Mère : </label>
              <input type="string" name="mother" id="mother" />
            </div>
            <div>
              <label htmlFor="breeder">Éleveur : </label>
              <input type="string" name="breeder" id="breeder" />
            </div>
            <div>
              <label htmlFor="owner">Propriétaire : </label>
              <input type="string" name="owner" id="owner" />
            </div>
            <div>
              <label htmlFor="generalNotes">Notes : </label>
              <textarea name="generalNotes" id="generalNotes" />
            </div>
          </Tab>
        </Tabs>
      </div>
      <button type="submit">Valider</button>
    </form>
  );
}
