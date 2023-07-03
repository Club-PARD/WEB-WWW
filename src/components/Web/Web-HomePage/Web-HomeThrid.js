import React, { useState, useEffect } from "react";
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
  justify-content: center;
  max-height: 100vh;
  margin: 0 auto;
`;

const TimeTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 32px;
  line-height: 140%;
  margin-top: 143px;
  color: white;
  margin-bottom: 40px;
`;

const PartDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px; /* Add margin-top for spacing */
`;

const HomeThird = ({ setTime }) => {
  //TODO: 현재 스토리지를 통해서 세션 스토리지에 값이 저장되는 것을 확인하였습니다. 콘솔창을 확인해보니 HomeThird가 HomeSecond에서 Theme을 새로 선택할 때마다 재로딩이 되어서 화면이 스크롤 되어야 하는데
  //TODO: 맨 처음에 페이지를 로딩 할 때 한번만 페이지가 랜덤 theme 값으로 로딩되고 변화하는 theme 값에 따라 실시간으로 수정하지 않는 것 같습니다. 이 문제를 어떻게 해결해야 할지 모르겠습니다.
  const theme = sessionStorage.getItem("THEME");
  console.log("Theme from sessionStorage:", theme);

  const handleOptionChange = (duration) => {
    setTime(duration);
  };

  const getBackground = () => {
    switch (theme) {
      case "0":
        return;
      case "1":
        return `url(${FireBack})`;
      case "2":
        return `url(${ForestBack})`;
      case "3":
        return `url(${SandBack})`;
      default:
        return;
    }
  };

  const Box = styled.div`
    width: 355px;
    height: 500px;
    flex-shrink: 0;
    border-radius: 20px;
    background-color: transparent;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.1),
      8px 13px 34px 0px rgba(0, 0, 0, 0.1),
      33px 53px 62px 0px rgba(0, 0, 0, 0.09),
      74px 119px 84px 0px rgba(0, 0, 0, 0.05),
      132px 212px 100px 0px rgba(0, 0, 0, 0.01),
      207px 331px 109px 0px rgba(0, 0, 0, 0);
    display: flex;
    justify-content: center; /* 수평 가운데 정렬 */
    align-items: center; /* 수직 가운데 정렬 */
    margin-right: 111px;
    color: var(--text, #323338);
    text-align: center;
    font-size: 48px;

    &:hover {
      border-radius: 20px;
      border: 3px solid ${(props) => getBorderColor(props.theme)};
      background: ${(props) => SubColor(props.theme)};
      backdrop-filter: blur(15px);
      color: var(--main-white, #f2f2f2);
    }
  `;

  const getBorderColor = (theme) => {
    switch (theme) {
      case "0":
        return "#f2f2f2"; // 예: 기본 흰색
      case "1":
        return "#DD5257"; // 예: 빨간색
      case "2":
        return "#5BC184"; // 예: 초록색
      case "3":
        return "#3182F6"; // 예: 파란색
      default:
        return "#f2f2f2"; // 기본 흰색
    }
  };

  const SubColor = (theme) => {
    switch (theme) {
      case "0":
        return "#f2f2f2"; // 예: 기본 흰색
      case "1":
        return "rgba(221, 82, 87, 0.20)"; // 예: 빨간색
      case "2":
        return "rgba(91, 193, 132, 0.20)"; // 예: 초록색
      case "3":
        return "rgba(49, 130, 246, 0.20)"; // 예: 파란색
      default:
        return "#f2f2f2"; // 기본 흰색
    }
  };

  const TimeA = styled(Box)`
    margin-left: 115px;
  `;

  const TimeB = styled(Box)``;

  const TimeC = styled(Box)``;

  const HomeThirdWrapper = styled.div`
    background: ${getBackground()};
    background-size: cover;
    height: 100vh;
    margin: 0 auto;
  `;

  return (
    <HomeThirdWrapper>
      <Container>
        <div className="Barun-GothicUL-font">
          <TimeTitle>시간을 선택해주세요.</TimeTitle>
          <PartDiv>
            <Link
              to="/Video"
              style={{ textDecoration: "none" }}
              onClick={() => handleOptionChange(15)}
            >
              <TimeA theme={theme}>15분 선택</TimeA>
            </Link>
            <Link
              to="/Video"
              style={{ textDecoration: "none" }}
              onClick={() => handleOptionChange(30)}
            >
              <TimeB theme={theme}>30분 선택</TimeB>
            </Link>
            <Link
              to="/Video"
              style={{ textDecoration: "none" }}
              onClick={() => handleOptionChange(0)}
            >
              <TimeC theme={theme}>무제한</TimeC>
            </Link>
          </PartDiv>
        </div>
      </Container>
    </HomeThirdWrapper>
  );
};

export default HomeThird;
