import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import {toFormatedDate} from "../helpers";

import { Card, CardDeck, Carousel } from "react-bootstrap";
import "./styles/Horses.css";
import SearchBox from "./SearchBox";

export default function Horses(props) {
  const [horses, setHorses] = useState(null);
  const [filteredHorses, setFilteredHorses] = useState(null);


  useEffect(() => {
    if (props.loggedInUser) {
      axios
        .get(`${API_URL}/horses/${props.loggedInUser._id}/all`, {
          withCredentials: true,
        })
        .then((horsesArray) => {
          setHorses(horsesArray.data);
          setFilteredHorses(horsesArray.data)
        })
        .catch((err) => console.log("in /horses/userID/all", err));
    }
  }, [props.loggedInUser]);

  const handleSearch = (e) => {
    let search = e.currentTarget.value.toLowerCase();
    let cloneHorses = horses.filter(horse => {
      return (
        horse.name.toLowerCase().includes(search) || (horse.breeder && horse.breeder.toLowerCase().includes(search)) || (horse.owner && horse.owner.toLowerCase().includes(search))
      )
    });
    setFilteredHorses(cloneHorses);
  }

  return (
    <div id="Horses">
      <div className="bienvenue">
        Bienvenue {props.loggedInUser ? <>{props.loggedInUser.username}</> : ""}{" "}
      </div>
      <div className="search-box">
        <SearchBox onSearch={handleSearch} />
      </div>
      <Link className="button btn-orange" to="/horses/create">
        Ajouter un cheval
      </Link>
      <CardDeck className="cards-container">
        {filteredHorses ? (
          filteredHorses.map((horse, i) => {
            return (
                <Card key={"horse" + i} className="horse-card">
                <Link to={`/horses/${horse._id}`}>
                  <Carousel
                    controls={false}
                    indicators={false}
                    className="horse-pictures"
                  >
                    {horse.pictures.map((picture, i) => {
                      return (
                        <Carousel.Item
                          className="horse-one-picture"
                          key={horse.name + "picture" + i}
                          style={{ backgroundImage: `url(${picture})` }}
                        ></Carousel.Item>
                      );
                    })}
                  </Carousel>
                  <Card.Body>
                    <Card.Title className="horse-name">{horse.name}</Card.Title>
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
                                phase.phaseName.includes("Cheval de selle")
                                  ? "/images/selle.png"
                                  : phase.phaseName.includes("Débourrage")
                                  ? "/images/breaking.png"
                                  : "/images/pretraining.png"
                              }
                              alt={phase.phaseName}
                            />
                          </div>
                        );
                      })}
                  </Card.Footer>
                  </Link>
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
