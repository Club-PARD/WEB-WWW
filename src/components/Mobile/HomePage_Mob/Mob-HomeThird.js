import React, { Component } from "react";
import Slider from "react-slick";
import styled from "styled-components";

import Sand from "../../../Assets/img/SandMob.png";
import Fire from "../../../Assets/img/FireMob.png";
import Forest from "../../../Assets/img/ForestMob.png";
import Come from "../../../Assets/img/ComeMob.png";
import "../../../App.css";

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
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100vh;
`;

const Image = styled.img`
  width: 300px;
  height: 400px;
  flex-shrink: 0;
  border-radius: 10px;
`;

const Textbox = styled.div`
  display: flex;
  color: #fff;
  text-align: center;
  font-size: 18px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 20px;
`;

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };
    return (
      <div>
        <PartDiv>
          <CarouselBox>
            <Textbox className="Barun-GothicUL-font">
              ���� ���� �׸��� �������ּ���
            </Textbox>
            <Slider {...settings}>
              <div>
                <Image src={Sand} alt="Sand" />
              </div>
              <div>
                <Image src={Fire} alt="Fire" />
              </div>
              <div>
                <Image src={Forest} alt="Forest" />
              </div>
              <div>
                <Image src={Come} alt="Come" />
              </div>
            </Slider>
          </CarouselBox>
        </PartDiv>
      </div>
    );
  }
}
