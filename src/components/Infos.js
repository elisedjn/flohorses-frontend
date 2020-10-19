import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

import './styles/Infos.css';

export default function Infos(props) {
  const [showEdit, setShowEdit] = useState({ display: "none" });
  const [showInfos, setShowInfos] = useState({ display: "block" });
  const [horseInfos, setHorseInfos] = useState(null);

  useEffect(() => {
    const { father, mother, breeder, owner, generalNotes } = props.infos;
    setHorseInfos({ father, mother, breeder, owner, generalNotes });
  }, [props.infos]);

  const toggleShow = () => {
    setShowEdit({ display: "block" });
    setShowInfos({ display: "none" });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const { father, mother, breeder, owner, generalNotes } = e.currentTarget;
    const updatedInfos = {
      father: father.value,
      mother: mother.value,
      breeder: breeder.value,
      owner: owner.value,
      generalNotes: generalNotes.value,
    };
    axios
      .patch(
        `${API_URL}/horses/onehorse/${props.infos._id}/infos/edit`,
        updatedInfos,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        setHorseInfos(updatedInfos);
        setShowEdit({ display: "none" });
        setShowInfos({ display: "block" });
      })
      .catch((err) => console.log("edit infos on a horse", err));
  };

  if (!horseInfos) {
    return <div>Loading</div>;
  } else {
    return (
      <div id="Infos">
        <div className="on-read" style={showInfos}>
          <p className="field">Par <strong>{horseInfos.father}</strong> et <strong>{horseInfos.mother}</strong></p>
          <p className="field">Éleveur : <strong>{horseInfos.breeder}</strong></p>
          <p className="field">Propriétaire : <strong>{horseInfos.owner}</strong></p>
          <p className="field">Notes :</p>
          <p className="notes" onDoubleClick={toggleShow} >{horseInfos.generalNotes}</p>
          <button className="small-button btn-orange" onClick={toggleShow}>Éditer</button>
        </div>
        <div className="on-edit" style={showEdit}>
          <form onSubmit={handleEdit}>
            <div className="field">
              <label>Par</label>
              <input
                className="small-input"
                type="string"
                defaultValue={horseInfos.father}
                name="father"
              />
              <label>et</label>
              <input
                className="small-input"
                type="string"
                defaultValue={horseInfos.mother}
                name="mother"
              />
            </div>
            <div className="field">
              <label>Éleveur : </label>
              <input
                className="big-input"
                type="string"
                defaultValue={horseInfos.breeder}
                name="breeder"
              />
            </div>
            <div className="field">
              <label>Propriétaire : </label>
              <input
                className="big-input"
                type="string"
                defaultValue={horseInfos.owner}
                name="owner"
              />
            </div>
            <div className="field">
              <label>Notes : </label>
              <br />
              <textarea
                className="notes textarea"
                defaultValue={horseInfos.generalNotes}
                name="generalNotes"
              />
            </div>
            <button className="small-button btn-orange" type="submit">Valider</button>
          </form>
        </div>
      </div>
    );
  }
}
