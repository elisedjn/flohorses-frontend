import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

import './styles/MyCarousel.css';

export default function MyCarousel(props) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} id="MyCarousel">
      {props.pictures.map((picture, index) => {
        return (
          <Carousel.Item key={"horse picture" + index} className="horse-one-picture" style={{backgroundImage : `url(${picture})`}} >
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
