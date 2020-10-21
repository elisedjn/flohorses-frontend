import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

export default function SearchBox(props) {
  return (
    <div>
      <div>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">
              <span role="img" aria-label="Recherche">
                {" "}
                &#128270;{" "}
              </span>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={props.onSearch}
            placeholder="Cheval, propriétaire, éleveur..."
            aria-label="Cheval, propriétaire, éleveur..."
            aria-describedby="basic-addon1"
          />
        </InputGroup>
      </div>
      <div> Filtrer
        {/* <fieldset>
          <legend>Filtres</legend>
          <div>
            <input type="checkbox" id="selle" name="phase" value="selle" />
            <label for="selle">Cheval de selle</label>
          </div>
          <div>
            <input type="checkbox" id="breaking" name="phase" value="breaking" />
            <label for="breaking">Débourrage</label>
          </div>
          <div>
            <input type="checkbox" id="pretraining" name="phase" value="pretraining" />
            <label for="pretraining">Pré-entrainement</label>
          </div>
        </fieldset> */}
      </div>
      <div>Trier</div>
    </div>
  );
}
