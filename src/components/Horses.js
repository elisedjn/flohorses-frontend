import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { toFormatedDate } from "../helpers";

import { Card, CardDeck, Carousel } from "react-bootstrap";
import "./styles/Horses.css";
import SearchBox from "./SearchBox";

export default function Horses(props) {
  const [horses, setHorses] = useState(null);
  const [filteredHorses, setFilteredHorses] = useState(null);
  const [search, setSearch] = useState("");
  const [activated, setActivated] = useState({
    breaking: true,
    pretraining: true,
    selle: true,
  });
  const [present, setPresent] = useState(false);

  useEffect(() => {
    if (props.loggedInUser) {
      axios
        .get(`${API_URL}/horses/${props.loggedInUser._id}/all`, {
          withCredentials: true,
        })
        .then((horsesArray) => {
          setHorses(horsesArray.data);
          setFilteredHorses(horsesArray.data);
        })
        .catch((err) => console.log("in /horses/userID/all", err));
    }
  }, [props.loggedInUser]);

  useEffect(() => {
    if (horses && filteredHorses) {
      let cloneHorses = horses.filter((horse) => {
        const nameIsSearched = horse.name.toLowerCase().includes(search);
        const breederIsSearched =
          horse.breeder && horse.breeder.toLowerCase().includes(search);
        const ownerIsSearched =
          horse.owner && horse.owner.toLowerCase().includes(search);
        const isSearched =
          nameIsSearched || breederIsSearched || ownerIsSearched;

        let isFiltered = true;
        if (activated.selle || activated.breaking || activated.pretraining) {
          const horsePhases = horse.phases.map((phase) => phase.shortName);
          const isSelleFiltered =
            activated.selle && horsePhases.includes("selle");
          const isBreakingFiltered =
            activated.breaking && horsePhases.includes("breaking");
          const isPretrainingFiltered =
            activated.pretraining && horsePhases.includes("pretraining");
          isFiltered =
            isSelleFiltered || isBreakingFiltered || isPretrainingFiltered;
        }

        let isPresent = true;
        if (present) {
          isPresent = false;
          horse.phases.forEach((phase) => {
            if (phase.active === true) isPresent = true;
          });
        }

        return isSearched && isFiltered && isPresent;
      });
      setFilteredHorses(cloneHorses);
    }
  }, [search, activated, horses, present]);

  return (
    <div id="Horses">
      <div className="bienvenue">
        Bienvenue {props.loggedInUser ? <>{props.loggedInUser.username}</> : ""}{" "}
      </div>
      <div className="search-box">
        <SearchBox
          onSearch={(e) => setSearch(e.currentTarget.value.toLowerCase())}
          onFilter={(activated) => setActivated(activated)}
          onPresent={(isActive) => setPresent(isActive)}
        />
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
                                  ? (phase.active ? "/images/selle.png" : "/images/sellebw.png")
                                  : phase.phaseName.includes("Débourrage")
                                  ? (phase.active ? "/images/breaking.png" : "/images/breakingbw.png")
                                  : (phase.active ? "/images/pretraining.png" : "/images/pretrainingbw.png" )
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
