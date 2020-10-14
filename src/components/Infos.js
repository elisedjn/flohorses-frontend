import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config";

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
          <button onClick={toggleShow}>Éditer</button>
          <p>Père : {horseInfos.father}</p>
          <p>Mère : {horseInfos.mother}</p>
          <p>Éleveur : {horseInfos.breeder}</p>
          <p>Propriétaire : {horseInfos.owner}</p>
          <p>Notes : {horseInfos.generalNotes}</p>
        </div>
        <div className="on-edit" style={showEdit}>
          <form onSubmit={handleEdit}>
            <div>
              <label>Père : </label>
              <input
                type="string"
                defaultValue={horseInfos.father}
                name="father"
              />
            </div>
            <div>
              <label>Mère : </label>
              <input
                type="string"
                defaultValue={horseInfos.mother}
                name="mother"
              />
            </div>
            <div>
              <label>Éleveur : </label>
              <input
                type="string"
                defaultValue={horseInfos.breeder}
                name="breeder"
              />
            </div>
            <div>
              <label>Propriétaire : </label>
              <input
                type="string"
                defaultValue={horseInfos.owner}
                name="owner"
              />
            </div>
            <div>
              <label>Notes : </label>
              <textarea
                defaultValue={horseInfos.generalNotes}
                name="generalNotes"
              />
            </div>
            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
    );
  }
}
