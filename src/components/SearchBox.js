import React, { useState } from "react";
import { InputGroup, FormControl, Button, ButtonGroup } from "react-bootstrap";
import "./styles/SearchBox.css";

export default function SearchBox(props) {
  const [selleIsActive, setSelleIsActive] = useState(false);
  const [breakingIsActive, setBreakingIsActive] = useState(false);
  const [pretrainingIsActive, setPretrainingIsActive] = useState(false);
  const [present, setPresent] = useState(false);

  const handleFilter = (phase) => {
    const phasesStatus = {
      selle: selleIsActive,
      breaking: breakingIsActive,
      pretraining: pretrainingIsActive,
    };

    if (phase === "selle") {
      setSelleIsActive(!selleIsActive);
      phasesStatus.selle = !selleIsActive;
    } else if (phase === "breaking") {
      setBreakingIsActive(!breakingIsActive);
      phasesStatus.breaking = !breakingIsActive;
    } else if (phase === "pretraining") {
      setPretrainingIsActive(!pretrainingIsActive);
      phasesStatus.pretraining = !pretrainingIsActive;
    }
    props.onFilter(phasesStatus);
  };

  const handlePresent = () => {
    setPresent(!present);
    props.onPresent(!present);
  };

  return (
    <div id="SearchBox">
      <div className="search-part">
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
      <div className="filter-part">
        <ButtonGroup aria-label="Filters">
          <Button
            className={selleIsActive ? "filter-btn active" : "filter-btn"}
            onClick={() => handleFilter("selle")}
          >
            <img src="/images/selle.png" alt="Cheval de Selle" />
          </Button>
          <Button
            className={breakingIsActive ? "filter-btn active" : "filter-btn"}
            onClick={() => handleFilter("breaking")}
          >
            <img src="/images/breaking.png" alt="Débourrage" />
          </Button>
          <Button
            className={pretrainingIsActive ? "filter-btn active" : "filter-btn"}
            onClick={() => handleFilter("pretraining")}
          >
            <img src="/images/pretraining.png" alt="Pré-entrainement" />
          </Button>
        </ButtonGroup>
        <div>
          <input
            onChange={handlePresent}
            type="checkbox"
            id="active"
            name="active"
          />
          <label htmlFor="active">Actuellement au travail</label>
        </div>
      </div>
      <div className="sort-part">
        <label htmlFor="sortby">Trier par :</label>
        <select id="sortby" name="sortby">
          <option value="horseName">Nom du Cheval (A-Z)</option>
          <option value="horseAgeYoung">Âge du Cheval (+jeune en 1er)</option>
          <option value="horseAgeOld">Âge du Cheval (+âgé en 1er)</option>
        </select>
      </div>
    </div>
  );
}
