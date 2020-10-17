import React from "react";
import axios from "axios";

import { API_URL } from "../config";

import './styles/Phase.css'

export default function NewPhase(props) {
  const handleCreatePhase = (e) => {
    e.preventDefault();
    const { shortName, arrivalDate, departureDate, phaseNotes } = e.currentTarget;
    const newPhase = {
      shortName : shortName.value,
      arrivalDate : arrivalDate.value,
      departureDate : departureDate.value,
      phaseNotes : phaseNotes.value,
    }
    newPhase.shortName === "selle" ? newPhase.phaseName = "Cheval de selle" : newPhase.shortName === "breaking" ? newPhase.phaseName = "Débourrage" : newPhase.phaseName = "Pré entrainement"

    axios.patch(`${API_URL}/horses/onehorse/${props.horseID}/create`, newPhase, { withCredentials: true })
      .then(() => props.history.push(`/horses/${props.horseID}`))
      .catch((err) => console.log("create phase on a horse", err));
  }

  return (
    <form className="Phase" onSubmit={handleCreatePhase}>
      <div className="field">
        <label htmlFor="shortName">Pour : </label>
        <select className="big-input" id="shortName" name="shortName" >
          <option value="selle">Cheval de selle</option>
          <option value="breaking">Débourrage</option>
          <option value="pretraining">Pré entrainement</option>
        </select>
      </div>
      <div className="field">
        <label>Arrivée : </label>
        <input className="big-input" type="date" name="arrivalDate" />
      </div>
      <div className="field">
        <label>Départ : </label>
        <input className="big-input" type="date" name="departureDate" />
      </div>
      <div className="field">
        <label>Notes : </label>
        <br />
        <textarea className="notes textarea" name="phaseNotes" />
      </div>
      <button className="small-button btn-orange" type="submit">
        Valider
      </button>
    </form>
  );
}
