import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config";
import { toFormatedDate, nameIteration } from "../helpers";

import { Tab, Tabs } from "react-bootstrap";
import "./styles/OneHorse.css";

import MyCarousel from "./MyCarousel";
import Phase from "./Phase";
import Infos from "./Infos";
import NewPhase from "./NewPhase";

export default function OneHorse(props) {
  const [horse, setHorse] = useState(null);
  const [showKey, setShowKey] = useState("infos-tab");

  useEffect(() => {
    axios
      .get(`${API_URL}/horses/onehorse/${props.match.params.horseID}`, {
        withCredentials: true,
      })
      .then((response) => {
        setHorse(response.data)
      })
      .catch((err) => console.log("Get one horse", err));
  }, [props.match.params.horseID]);

  const handleCreatePhase = (e) => {
    e.preventDefault();
    const {
      shortName,
      arrivalDate,
      departureDate,
      phaseNotes,
    } = e.currentTarget;
    const newPhase = {
      shortName: shortName.value,
      arrivalDate: arrivalDate.value,
      departureDate: departureDate.value,
      phaseNotes: phaseNotes.value,
    };

    if (newPhase.shortName === "selle") {
      nameIteration(horse.phases, newPhase, "Cheval de selle");
    } else if (newPhase.shortName === "breaking") {
      nameIteration(horse.phases, newPhase, "Débourrage");
    } else if (newPhase.shortName === "pretraining") {
      nameIteration(horse.phases, newPhase, "Pré-entrainement");
    }

    newPhase.arrivalDate !== "" && newPhase.departureDate === ""
      ? (newPhase.active = true)
      : (newPhase.active = false);

    axios
      .patch(`${API_URL}/horses/onehorse/${horse._id}/create`, newPhase, {
        withCredentials: true,
      })
      .then(() => {
        let updatedHorse = JSON.parse(JSON.stringify(horse));
        updatedHorse.phases.push(newPhase);
        setHorse(updatedHorse);
        setShowKey(newPhase.phaseName + "-tab");
      })
      .catch((err) => console.log("create phase on a horse", err));
  };

  const updateComponent = (updatedInfos) => {
    let updatedHorse = JSON.parse(JSON.stringify(horse));
    for (let i=0 ; i < updatedHorse.phases.length; i++) {
      if(updatedHorse.phases[i].phaseName === updatedInfos.phaseName){
        updatedHorse.phases[i] = JSON.parse(JSON.stringify(updatedInfos))
      }
    }
    setHorse(updatedHorse);
  }

  if (horse) {
    const { name, birthdate, sex, pictures, phases } = horse;
    let actualPhase = "";
    phases.forEach((phase) => {
      if (phase.active) actualPhase = phase.phaseName;
    });

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
            <p>Pour: {actualPhase}</p>
            <img
              className="phase-logo"
              src={
                actualPhase.includes("Cheval de selle")
                  ? "/images/selle.png"
                  : actualPhase.includes("Débourrage")
                  ? "/images/breaking.png"
                  : actualPhase.includes("Pré-entrainement")
                  ? "/images/pretraining.png"
                  : ""
              }
              alt={actualPhase}
            />
          </div>
        </div>
        <div className="dividers">
          <Tabs
            defaultActiveKey="infos-tab"
            activeKey={showKey}
            onSelect={(k) => setShowKey(k)}
          >
            <Tab eventKey="infos-tab" title="Infos">
              <Infos infos={horse} />
            </Tab>
            {phases.map((phase, index) => (
              <Tab
                eventKey={phase.phaseName + "-tab"}
                title={phase.phaseName}
                key={"divider" + index}
              >
                <Phase onUpdate={updateComponent} infos={phase} id={horse._id} className="one-phase" />
              </Tab>
            ))}
            <Tab eventKey="add-phase" title="+">
              <NewPhase onCreate={handleCreatePhase} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  } else {
    return <div> Loading </div>;
  }
}
