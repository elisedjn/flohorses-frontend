import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { toFormatedDate } from "../helpers";

import { Tab, Tabs } from "react-bootstrap";
import "./styles/OneHorse.css";

import MyCarousel from "./MyCarousel";
import Phase from "./Phase";
import Infos from "./Infos";

export default function OneHorse(props) {
  const [horse, setHorse] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/horses/onehorse/${props.match.params.horseID}`, {
        withCredentials: true,
      })
      .then((response) => setHorse(response.data))
      .catch((err) => console.log("Get one horse", err));
  }, [props.match.params.horseID]);

  if (horse) {
    const { name, birthdate, sex, pictures, phases } = horse;

    return (
      <div id="OneHorse">
        <div className="top-part">
          <div className="pictures">
            <Link to={`/horses/${horse._id}/pictures`}>
              <MyCarousel pictures={pictures} />
              Voir la galerie
            </Link>
          </div>
          <div className="identity">
            <h2>{name}</h2>
            <p>{sex}</p>
            <p>
              Né{sex === "Femelle" && "e"} le : {toFormatedDate(birthdate)}
            </p>
            <p>Phase actuelle</p>
          </div>
        </div>
        <div className="dividers">
          <Tabs defaultActiveKey="infos-tab">
            <Tab eventKey="infos-tab" title="Infos">
              <Infos infos={horse} />
            </Tab>
            {phases.map((phase, index) => (
              <Tab
                eventKey={phase.phaseName + "-tab"}
                title={phase.phaseName}
                key={"divider" + index}
              >
                <Phase infos={phase} id={horse._id} className="one-phase" />
              </Tab>
            ))}
            <Tab eventKey="add-phase" title="+">
              Ajouter une phase
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  } else {
    return <div> Loading </div>;
  }
}
