import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";

import Fire from "../../../Assets/img/fire.png";
import Forest from "../../../Assets/img/Forest.png";
import Come from "../../../Assets/img/Come.png";
import Sand from "../../../Assets/img/Sand.png";

import FireHover from "../../../Assets/img/FireHover.png";
import ForestHover from "../../../Assets/img/ForestHover.png";
import SandHover from "../../../Assets/img/SandHover.png";

import ComeBack from "../../../Assets/img/ComeBack.png";
import FireBack from "../../../Assets/img/FireBack.png";
import ForestBack from "../../../Assets/img/ForestBack.png";
import SandBack from "../../../Assets/img/SandBack.png";

import leftbutton from "../../../Assets/img/left button.png";
import rightbutton from "../../../Assets/img/right button.png";

const HomeSecondWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: url(${(props) => props.background}), rgba(211, 211, 211, 0.5);
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0a0a0a;
  background-position: center;
`;

const GlobalStyle = createGlobalStyle`
  HomeSecondWrapper {
    height: 100vh;
    width: 100vw;
    background-image: url(${(props) => props.background});
    background-size: cover;
    background-position: center;
  }
`;

const Div = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
`;

const CardsContainer = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 1800px;
  padding-left: 1300px;

  @media (min-width: 1024px) and (max-width: 1279px) {
    padding-top: 1600px;
    padding-left: 500px;
  }
  @media (min-width: 1280px) and (max-width: 1440px) {
    padding-top: 1800px;
    padding-left: 1120px;
  }
  @media (min-width: 1441px) and (max-width: 1469px) {
    padding-top: 1800px;
    padding-left: 1100px;
  }
  @media (min-width: 1470px) and (max-width: 1599px) {
    padding-top: 1800px;
    padding-left: 1170px;
  }
  @media (min-width: 1600px) and (max-width: 1999px) {
    padding-top: 1800px;
    padding-left: 1300px;
  }
  @media (min-width: 2000px) and (max-width: 2199px) {
    padding-top: 1950px;
    padding-left: 1680px;
  }
  @media (min-width: 2200px) and (max-width: 2560px) {
    padding-top: 2200px;
    padding-left: 2000px;
  }
`;

const CardWrapper = styled.div`
  background-image: url(${(props) =>
    props.hovered ? props.hoverImage : props.background});
  background-size: cover;
  width: 350px;
  height: 500px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out, background-image 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 20px;
`;

const Card1 = styled(CardWrapper)`
  background-image: url(${Come});
  background-size: cover;
  background-position: center;
`;

const Card2 = styled(CardWrapper)`
  background-size: cover;
  background-position: center;
`;

const Card3 = styled(CardWrapper)`
  background-size: cover;
  background-position: center;
`;

const Card4 = styled(CardWrapper)`
  background-size: cover;
  background-position: center;
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Dot = styled.div`
  width: ${({ active, long }) => (active ? (long ? "50px" : "30px") : "10px")};
  height: 10px;
  background-color: ${({ active }) => (active ? "white" : "grey")};
  margin: 0 5px;
  border-radius: 35%;
  transition: width 0.3s ease-in-out;
`;

const RotateRButton = styled.img`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  z-index: 1;
  scale: 80%;
`;

const RotateLButton = styled.img`
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;

  margin-left: -920px;
  position: relative;
  z-index: 1;
  scale: 80%;
`;

const Textbox = styled.div`
  position: absolute;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-top: 110px;
  margin-left: 38%;
  z-index: 3;
  color: white;
  text-align: center;
  font-size: 32px;
  font-weight: 300;
`;

const ButtonBox = styled.div`
  position: relative;
  padding-top: 750px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    padding-top: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 1280px) and (max-width: 1440px) {
    padding-top: 720px;
    margin-left: 85px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 1441px) and (max-width: 1599px) {
    padding-top: 720px;
    margin-left: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 1600px) and (max-width: 1999px) {
    padding-top: 750px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 2000px) and (max-width: 2199px) {
    padding-top: 900px;
    margin-left: -200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 2200px) and (max-width: 2560px) {
    padding-top: 1050px;
    margin-left: -355px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CircleOfCards = ({ setBackgroundImage, setTheme }) => {
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [closestCardRotation, setClosestCardRotation] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(Array(12).fill(false));

  const numberOfCards = 12;
  const angleIncrement = 30;
  const radius = 1100;

  const cards = [Card1, Card2, Card3, Card4];

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          // Rotate Left
          rotateLeft();
          break;
        case "ArrowRight":
          // Rotate Right
          rotateRight();
          break;
        default:
          break;
      }

      const adjustedRotation = (rotation + 360) % 360;
      const cardIndex =
        Math.round(adjustedRotation / angleIncrement) % cards.length;
      setActiveDotIndex(cardIndex);
    };

    // Add the event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [rotation]);

  useEffect(() => {
    //드래그 이벤트
    const handleMouseMove = (e) => {
      if (dragging) {
        const newRotation = rotation - (e.clientX - startX) * 0.05;
        setRotation(newRotation);
        setStartX(e.clientX);
      }
    };

    const handleMouseDown = (e) => {
      setDragging(true);
      setStartX(e.clientX);
    };

    const handleMouseUp = () => {
      setDragging(false);

      const targetRotation =
        Math.round(rotation / angleIncrement) * angleIncrement;
      const nearestRotation = (targetRotation + 360) % 360;
      const newRotation = getClosestRotation(nearestRotation);

      setRotation(newRotation);
      setClosestCardRotation(newRotation);

      // activeDotIndex를 계산
      const adjustedRotation = (newRotation + 360) % 360;
      const cardIndex =
        Math.round(adjustedRotation / angleIncrement) % cards.length;
      setActiveDotIndex(cardIndex);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, rotation]);

  const getBackgroundImage = (rotationValue) => {
    const index =
      (Math.abs(Math.round(rotationValue / angleIncrement)) +
        cards.length -
        1) %
      cards.length;
    switch (index) {
      case 0:
        return ForestBack;
      case 1:
        return FireBack;
      case 2:
        return ComeBack;
      case 3:
        return SandBack;
      default:
        return "";
    }
  };

  useEffect(() => {
    setBackgroundImage(getBackgroundImage(rotation));
  }, [rotation, setBackgroundImage]);

  const getClosestRotation = (nearestRotation) => {
    let newRotation = nearestRotation;
    newRotation = newRotation % 360;
    return newRotation;
  };

  const rotateRight = () => {
    let newRotation = rotation - angleIncrement;
    newRotation = newRotation % 360;
    setRotation(newRotation);
    setClosestCardRotation(newRotation);
    // setActiveDotIndex((activeDotIndex + 1) % cards.length);
  };

  const rotateLeft = () => {
    let newRotation = rotation + angleIncrement;
    if (newRotation + closestCardRotation > 180) {
      newRotation -= 360;
    }
    newRotation = (newRotation + 360) % 360;
    setRotation(newRotation);
    setClosestCardRotation(newRotation);
    // setActiveDotIndex((activeDotIndex - 1 + cards.length) % cards.length);
  };

  const handleClick = (index) => {
    // 카드를 눌렀을 경우에 일어나는 이벤트
    if (index % 4 === 0) {
      return;
    }

    const documentHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: documentHeight,
      behavior: "smooth",
    });
    sessionStorage.setItem("THEME", index % 4);
    window.dispatchEvent(new Event("sessionStorageModified"));
  };

  const dotComponents = cards.map((_, index) => (
    <Dot key={index} active={index === activeDotIndex} />
  ));

  const cardComponents = [];
  for (let i = 0; i < numberOfCards; i++) {
    const cardRotation = (i * angleIncrement + closestCardRotation) % 360;
    const verticalRotation = 90 - cardRotation;

    let backgroundImage;
    let hoverImage;
    switch (i % cards.length) {
      case 0: // Card1
        backgroundImage = Come;
        hoverImage = Come;
        break;
      case 1: // Card2
        backgroundImage = Fire; // 호버되지 않았을 때
        hoverImage = FireHover; // 호버될 때
        break;
      case 2: // Card3
        backgroundImage = Forest; // 호버되지 않았을 때
        hoverImage = ForestHover; // 호버될 때
        break;
      case 3: // Card4
        backgroundImage = Sand; // 호버되지 않았을 때
        hoverImage = SandHover; // 호버될 때
        break;
      default:
        backgroundImage = null;
        hoverImage = null;
        break;
    }

    cardComponents.push(
      <CardWrapper
        key={i}
        hovered={isHovered[i]}
        background={backgroundImage}
        hoverImage={hoverImage}
        style={{
          transform: `rotate(${verticalRotation}deg) translateY(-${radius}px)`,
        }}
        onMouseEnter={() => {
          const newIsHovered = [...isHovered];
          newIsHovered[i] = true;
          setIsHovered(newIsHovered);
        }}
        onMouseLeave={() => {
          const newIsHovered = [...isHovered];
          newIsHovered[i] = false;
          setIsHovered(newIsHovered);
        }}
        onClick={() => handleClick(i)}
      ></CardWrapper>
    );
  }

  return (
    <Div>
      <div className="Barun-GothicUL-font">
        <Textbox>쉬고 싶은 테마를 선택해주세요</Textbox>
      </div>
      <CardsContainer>{cardComponents}</CardsContainer>
      <ButtonBox>
        <RotateLButton src={leftbutton} onClick={rotateRight}></RotateLButton>
        <DotWrapper>{dotComponents}</DotWrapper>
        <RotateRButton src={rightbutton} onClick={rotateLeft}></RotateRButton>
      </ButtonBox>
    </Div>
  );
};

const HomeSecond = ({ setTheme }) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  return (
    <div>
      <HomeSecondWrapper background={backgroundImage}>
        <GlobalStyle background={backgroundImage} />
        <CircleOfCards
          setBackgroundImage={setBackgroundImage}
          setTheme={setTheme}
        />
      </HomeSecondWrapper>
    </div>
  );
};

export default HomeSecond;
