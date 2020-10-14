import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../config";
import toFormatedDate from "../helpers";

import { Carousel } from "react-bootstrap";

export default function OneHorse(props) {
  const [horse, setHorse] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/horses/onehorse/${props.match.params.horseID}`, { withCredentials: true })
      .then((response) => setHorse(response.data))
      .catch((err) => console.log("Get one horse", err));
  }, [props.match.params.horseID]);

  if (horse) {
    const {
      name,
      birthdate,
      breeder,
      owner,
      father,
      mother,
      sex,
      pictures,
      phases,
    } = horse;

    return (
      <div id="OneHorse">
        <div className="top-part">
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
          <div>
            <h2>{name}</h2>
            <p>{sex}</p>
            <p>
              Né{sex === "Femelle" && "e"} le : {toFormatedDate(birthdate)}
            </p>
            <p>Phase actuelle</p>
          </div>
        </div>
        <div className="all-phases">
            info
        </div>
      </div>
    );
  } else {
    return <div> Loading </div>;
  }
}
