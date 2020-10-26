import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

import './styles/Galery.css';

export default function Galery(props) {
  const [pictures, setPictures] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/horses/onehorse/${props.match.params.horseID}`, {
        withCredentials: true,
      })
      .then((response) => setPictures(response.data.pictures))
      .catch((err) => console.log("Get one horse", err));
  }, [props.match.params.horseID]);

  const handleAddImage = (e) => {
    e.preventDefault();
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.img.files[0]);
    axios.post(`${API_URL}/upload`, uploadData, { withCredentials: true })
      .then((response) => {
        let updatedPictures = JSON.parse(JSON.stringify(pictures));
        updatedPictures.push(response.data.image);
        console.log(updatedPictures)
        axios.patch(`${API_URL}/horses/onehorse/${props.match.params.horseID}/pictures`, updatedPictures, { withCredentials: true })
          .then((res) => setPictures(updatedPictures))
          .catch((err) => console.log("update horse images", err));
      })
      .catch((err) => console.log("Upload a picture", err));
  };

  return !pictures ? (
    <div>Loading</div>
  ) : (
    <div id="Gallery">
      <div className="images">
      {pictures.map((picture, index) => {
        return (
          <div key={props.match.params.horseID + "picture" + index} className="image-container">
            <img src={picture} alt={"picture" + index} />
          </div>
        );
      })}
      </div>
      <div>
        <form onSubmit={handleAddImage}>
          <label htmlFor="img">Ajouter une image</label>
          <input type="file" id="img" name="img" accept="image/*" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
