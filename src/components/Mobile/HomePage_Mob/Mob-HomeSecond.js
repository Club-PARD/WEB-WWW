import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import Sand from "../../../Assets/img/Sand.png";
import Fire from "../../../Assets/img/Fire.png";
import Forest from "../../../Assets/img/Forest.png";
import Come from "../../../Assets/img/Come.png";

const PartDiv = styled.div`
  height: 812px;
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-content: center;
  margin: 0 auto;
`;

const CarouselBox = styled.div`
  margin-top: 250px;
`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <PartDiv>
          <CarouselBox>
            <Slider {...settings}>
              <div>
                <img src={Sand} alt="Sand" />
              </div>
              <div>
                <img src={Fire} alt="Fire" />
              </div>
              <div>
                <img src={Forest} alt="Forest" />
              </div>
              <div>
                <img src={Come} alt="Come" />
              </div>
            </Slider>
          </CarouselBox>
        </PartDiv>
      </div>
    );
  }
}
