import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import toFormatedDate from "../helpers";

import { Card, CardDeck, Carousel } from "react-bootstrap";
import "./styles/Horses.css";

export default function Horses(props) {
  const [horses, setHorses] = useState(null);

  useEffect(() => {
    if (props.loggedInUser) {
      axios
        .get(`${API_URL}/horses/${props.loggedInUser._id}/all`, {
          withCredentials: true,
        })
        .then((horsesArray) => setHorses(horsesArray.data))
        .catch((err) => console.log("in /horses/userID/all", err));
    }
  }, [props.loggedInUser]);

  return (
    <div id="Horses">
      <div>
        Bienvenue {props.loggedInUser ? <>{props.loggedInUser.username}</> : ""}{" "}
      </div>
      <div>Search box</div>
      <Link className="button btn-orange" to="/horses/create">
        Ajouter un cheval
      </Link>
      <CardDeck className="cards-container">
        {horses ? (
          horses.map((horse, i) => {
            return (
              <Card key={"horse" + i} className="horse-card">
                <Carousel controls={false} indicators={false} className="horse-pictures">
                  {horse.pictures.map((picture, i) => {
                    return (
                      <Carousel.Item className="horse-one-picture" key={horse.name + "picture" + i} style={{backgroundImage : `url(${picture})`}} >
                      </Carousel.Item>
                    );
                  })}
                </Carousel>
                <Card.Body>
                  <Card.Title>{horse.name}</Card.Title>
                  <div className="horse-infos">
                    <p>{horse.sex}</p>
                    <p>
                      Né{horse.sex === "Femelle" && "e"} le :{" "}
                      {toFormatedDate(horse.birthdate)}
                    </p>
                  </div>
                </Card.Body>
                <Card.Footer className="phases">
                  {horse.phases &&
                    horse.phases.map((phase, index) => {
                      return (
                        <div key={horse.name + "phase" + index}>
                          <img
                            className="phase-logo"
                            src={
                              phase.name === "Cheval de selle"
                                ? "/images/selle.png"
                                : phase.name === "Débourrage"
                                ? "images/breaking.png"
                                : "images/pretraining.png"
                            }
                            alt={phase.name}
                          />
                        </div>
                      );
                    })}
                </Card.Footer>
              </Card>
            );
          })
        ) : (
          <div>Loading</div>
        )}
      </CardDeck>
    </div>
  );
}
