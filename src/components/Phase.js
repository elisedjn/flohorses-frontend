import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../config";

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
        console.log(res)
        setPhaseInfos(updatedInfos);
        setShowEdit({ display: "none" });
        setShowInfos({ display: "block" });
      })
      .catch((err) => console.log("edit infos on a horse", err));
  };

  if (!phaseInfos) {
    return <div>Loading</div>;
  } else {
    return (
      <div className="Phase">
        <div className="on-read" style={showInfos}>
          <button onClick={toggleShow}>Éditer</button>
          <p>Arrivée : {phaseInfos.arrivalDate}</p>
          <p>Départ : {phaseInfos.departureDate}</p>
          <p>Notes : {phaseInfos.phaseNotes}</p>
        </div>
        <div className="on-edit" style={showEdit}>
          <form onSubmit={handleEdit}>
            <div>
              <label>Arrivée : </label>
              <input
                type="date"
                defaultValue={phaseInfos.arrivalDate}
                name="arrivalDate"
              />
            </div>
            <div>
              <label>Départ : </label>
              <input
                type="date"
                defaultValue={phaseInfos.departureDate}
                name="departureDate"
              />
            </div>
            <div>
              <label>Notes : </label>
              <textarea
                defaultValue={phaseInfos.phaseNotes}
                name="phaseNotes"
              />
            </div>
            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
    );
  }
}
