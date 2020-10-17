import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../config";
import {toFormatedDate, toCalendarDate} from "../helpers";

import './styles/Phase.css';

export default function Phase(props) {
  const [showEdit, setShowEdit] = useState({ display: "none" });
  const [showInfos, setShowInfos] = useState({ display: "block" });
  const [phaseInfos, setPhaseInfos] = useState(null);

  useEffect(() => {
    const { arrivalDate, departureDate, phaseNotes } = props.infos;
    setPhaseInfos({ arrivalDate, departureDate, phaseNotes });
  }, [props.infos]);

  const toggleShow = () => {
    setShowEdit({ display: "block" });
    setShowInfos({ display: "none" });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const { arrivalDate, departureDate, phaseNotes } = e.currentTarget;
    const updatedInfos = {
      arrivalDate: arrivalDate.value,
      departureDate: departureDate.value,
      phaseNotes: phaseNotes.value
    }
    axios
      .patch(`${API_URL}/horses/onehorse/${props.id}/${props.infos.shortName}/edit`, updatedInfos, { withCredentials: true })
      .then((res) => {
        setPhaseInfos(updatedInfos);
        setShowEdit({ display: "none" });
        setShowInfos({ display: "block" });
      })
      .catch((err) => console.log("edit phase on a horse", err));
  };

  if (!phaseInfos) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="Phase">
        <div className="on-read" style={showInfos}>
          <p className="field">Arrivée : <strong>{toFormatedDate(phaseInfos.arrivalDate)}</strong></p>
          <p className="field">Départ : <strong>{toFormatedDate(phaseInfos.departureDate)}</strong></p>
          <p className="field">Notes : </p> <p className="notes"> {phaseInfos.phaseNotes}</p>
          <button className="small-button btn-orange" onClick={toggleShow}>Éditer</button>
        </div>
        <div className="on-edit" style={showEdit}>
          <form onSubmit={handleEdit}>
            <div className="field">
              <label>Arrivée : </label>
              <input
                className="big-input"
                type="date"
                defaultValue={toCalendarDate(phaseInfos.arrivalDate)}
                name="arrivalDate"
              />
            </div>
            <div className="field">
              <label>Départ : </label>
              <input
                className="big-input"
                type="date"
                defaultValue={toCalendarDate(phaseInfos.departureDate)}
                name="departureDate"
              />
            </div>
            <div className="field">
              <label>Notes : </label>
              <br />
              <textarea
                className="notes textarea"
                defaultValue={phaseInfos.phaseNotes}
                name="phaseNotes"
              />
            </div>
            <button className="small-button btn-orange" type="submit">Valider</button>
          </form>
        </div>
      </div>
    );
  }
}
