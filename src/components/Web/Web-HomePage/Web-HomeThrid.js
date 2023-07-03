import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import SandBack from "../../../Assets/img/SandBack.png";
import ForestBack from "../../../Assets/img/ForestBack.png";
import FireBack from "../../../Assets/img/FireBack.png";
import ComeBack from "../../../Assets/img/ComeBack.png";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh; /* Set a minimum height */
`;

const TimeTitle = styled.div`
  font-family: "Pretendard Variable";
  font-style: normal;
  font-weight: 800;
  font-size: 24px;
  line-height: 140%;
  margin-top: 20px; /* Add margin-top for spacing */
`;

const PartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px; /* Add margin-top for spacing */
`;

const Box = styled.div`
  width: 355px;
  height: 500px;
  flex-shrink: 0;
  border-radius: 20px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
  background-color: transparent;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
    8px 13px 34px 0px rgba(0, 0, 0, 0.1), 33px 53px 62px 0px rgba(0, 0, 0, 0.09),
    74px 119px 84px 0px rgba(0, 0, 0, 0.05),
    132px 212px 100px 0px rgba(0, 0, 0, 0.01),
    207px 331px 109px 0px rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  margin-right: 111px;

  &:hover {
    border-radius: 20px;
    border: 1px solid var(--main-white, #f2f2f2);
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(15px);
  }
`;

const TimeText = styled.a`
  color: var(--text, #323338);
  text-align: center;
  font-size: 48px;
  font-family: NanumBarunGothic;
  font-weight: 600;
  line-height: 140%;

  &:hover {
    color: var(--main-white, #f2f2f2);
  }
`;

const TimeA = styled(Box)`
  margin-left: 115px;
`;

const TimeB = styled(Box)``;

const TimeC = styled(Box)``;

const HomeThird = ({ setTime, theme }) => {
  const handleOptionChange = (duration) => {
    setTime(duration);
  };

  const getBackground = () => {
    switch (theme) {
      case 0:
        return;
      case 1:
        return `url(${FireBack})`;
      case 2:
        return `url(${ForestBack})`;
      case 3:
        return `url(${SandBack})`;
      default:
        return;
    }
  };

  const HomeThirdWrapper = styled.div`
    background: ${getBackground()};
    background-size: cover;
    height: 100vh;
    margin: 0 auto;
  `;

  return (
    <HomeThirdWrapper>
      <Container>
        <TimeTitle>시간을 선택해주세요.</TimeTitle>
        <PartDiv>
          <Link
            to="/Video"
            style={{ textDecoration: "none" }}
            onClick={() => handleOptionChange(15)}
          >
            <TimeA>
              <TimeText>15분 선택</TimeText>
            </TimeA>
          </Link>
          <Link
            to="/Video"
            style={{ textDecoration: "none" }}
            onClick={() => handleOptionChange(30)}
          >
            <TimeB>
              <TimeText>30분 선택</TimeText>
            </TimeB>
          </Link>
          <Link
            to="/Video"
            style={{ textDecoration: "none" }}
            onClick={() => handleOptionChange(0)}
          >
            <TimeC>
              <TimeText>무제한</TimeText>
            </TimeC>
          </Link>
        </PartDiv>
      </Container>
    </HomeThirdWrapper>
  );
};

export default HomeThird;
