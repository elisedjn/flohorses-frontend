import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

import "./styles/Galery.css";

export default function Galery(props) {
  const [pictures, setPictures] = useState(null);
  const [newImageSrc, setNewImageSrc] = useState("/images/addimage.png");

  useEffect(() => {
    axios
      .get(`${API_URL}/horses/onehorse/${props.match.params.horseID}`, {
        withCredentials: true,
      })
      .then((response) => setPictures(response.data.pictures))
      .catch((err) => console.log("Get one horse", err));
  }, [props.match.params.horseID]);

  const handleAddImage = (e) => {
    setNewImageSrc("/images/loading.gif");
    e.preventDefault();
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.files[0]);
    axios
      .post(`${API_URL}/upload`, uploadData, { withCredentials: true })
      .then((response) => {
        let updatedPictures = JSON.parse(JSON.stringify(pictures));
        updatedPictures.push(response.data.image);
        axios
          .patch(
            `${API_URL}/horses/onehorse/${props.match.params.horseID}/pictures`,
            updatedPictures,
            { withCredentials: true }
          )
          .then((res) => {
            setPictures(updatedPictures);
            setNewImageSrc("/images/addimage.png");
          })
          .catch((err) => console.log("update horse images", err));
      })
      .catch((err) => console.log("Upload a picture", err));
  };

  return !pictures ? (
    <div>Loading</div>
  ) : (
    <div id="Gallery">
      <div>
        <a href={`/horses/${props.match.params.horseID}`}><img className="back-arrow" src="/images/back.png" alt="Back" /></a>
      </div>
      <div className="images">
        {pictures.map((picture, index) => {
          return (
            <div
              key={props.match.params.horseID + "picture" + index}
              className="image-container"
            >
              <img src={picture} alt={"picture" + index} />
            </div>
          );
        })}
      </div>
      <div className="add-image">
        <input
          onChange={handleAddImage}
          type="file"
          id="img"
          name="img"
          accept="image/*"
        />
        <label htmlFor="img" className="btn-1">
          {" "}
          <img src={newImageSrc} alt="Ajouter" />
        </label>
      </div>
    </div>
  );
}
