import React from "react";

import './styles/Phase.css'

export default function NewPhase(props) {

  return (
    <form className="Phase" onSubmit={props.onCreate}>
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
