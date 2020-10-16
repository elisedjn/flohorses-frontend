import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

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
    e.preventDefault()
    let uploadData = new FormData();
    uploadData.append("imageUrl", e.currentTarget.img.files[0]);
    // axios.post("API REQUEST")
  }

  return !pictures ? (
    <div>Loading</div>
  ) : (
    <div>
      {pictures.map((picture, index) => {
        return (
          <div key={props.match.params.horseID + "picture" + index}>
            <img src={picture} alt={"picture" + index} />
          </div>
        );
      })}
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
