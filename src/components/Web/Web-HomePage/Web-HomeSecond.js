import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Fire from '../../../Assets/img/Fire.png';
import Forest from '../../../Assets/img/Forest.png';
import Come from '../../../Assets/img/Come.jpg'; 
import Sand from '../../../Assets/img/Sand.png';

const HomeSecondWrapper = styled.div`
  height: 100vh;
  background: url(${props => props.background}), rgba(211, 211, 211, 0.5);
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #0A0A0A;
  background-position: center;
`;

const GlobalStyle = createGlobalStyle`
  HomeSecondWrapper {
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
  }
`;

const Div = styled.div` //전체를 감싸고 있는 Div
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;     //overflow hidden으로 넘어가는 화면 구현하지 않고 자르기
`;

const CardsContainer = styled.div`  //전체 화면의 위치 조정하는 Container
  position: relative;
  display: inline-block;    //inline-block으로 전체 화면의 위치 조절 (margin과 padding 조절 가능하게)
  padding-top: 1800px;
  padding-left: 1300px;

  @media (max-width: 1440px) {    //미디어 쿼리로, 각 화면마다 설정한 padding 값 수정
    padding-top: 1700px;
    padding-left: 1000px;
  }

  @media (max-width: 1024px) {
    padding-top: 1300px;
    padding-left: 800px;
  }
`;

const CardWrapper = styled.div`   // 각 카드 component
  width: 350px;
  height: 500px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 20px;

`;

const Card1 = styled(CardWrapper)`    //카드 1의 세부설정
  background-image: url(${Come});
  background-size: cover;
  background-position: center;
`;

const Card2 = styled(CardWrapper)`    //카드 2의 세부설정 
  background-image: url(${Fire});
  background-size: cover;
  background-position: center;
`;

const Card3 = styled(CardWrapper)`    //카드 3의 세부설정 
  background-image: url(${Forest});
  background-size: cover;
  background-position: center;
`;

const Card4 = styled(CardWrapper)`    //카드 4의 세부설정
  background-image: url(${Sand});
  background-size: cover;
  background-position: center;
`;

const DotWrapper = styled.div`    //하단 점 Component
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-top: 750px;
  margin-left: 50px;
`;

const Dot = styled.div`     //긴 점 설정하는 Component
  width: ${({ active, long }) => (active ? (long ? '50px' : '30px') : '10px')};
  height: 10px;
  background-color: ${({ active }) => (active ? 'red' : 'grey')};
  margin: 0 5px;
  transition: width 0.3s ease-in-out;
`;

const RotateRButton = styled.button`    // 오른 쪽 회전 Component
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 750px;
  margin-left: 100px;
  position: relative;
  z-index: 1;                      // card container 위에 존재하므로, 우선순위를 부여하여 화면에 나타나게 설정
`;

const RotateLButton = styled.button`    //왼쪽 회전 Component
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 750px;
  margin-left: -700px;
  position: relative;
  z-index: 1;                        // card container 위에 존재하므로, 우선순위를 부여하여 화면에 나타나게 설정
`;


const CircleOfCards = ({ handleOptionChange, setBackgroundImage }) => {
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

      const targetRotation = Math.round(rotation / angleIncrement) * angleIncrement;
      const nearestRotation = (targetRotation + 360) % 360;
      const newRotation = getClosestRotation(nearestRotation);

      setRotation(newRotation);
      setClosestCardRotation(newRotation);
      setActiveDotIndex((Math.abs(Math.round(newRotation / angleIncrement)) + cards.length - 1) % cards.length);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, rotation]);

  useEffect(() => {
    const index = (Math.abs(Math.round(rotation / angleIncrement)) + cards.length - 1) % cards.length;
    switch (index) {
      case 0:
        setBackgroundImage(Come);
        break;
      case 1:
        setBackgroundImage(Fire);
        break;
      case 2:
        setBackgroundImage(Forest);
        break;
      case 3:
        setBackgroundImage(Sand);
        break;
      default:
        break;
    }
  }, [rotation]);

  const getClosestRotation = (nearestRotation) => {
    let newRotation = nearestRotation;
  
    // 회전이 360을 초과하거나 -360 미만일 경우 0으로 재설정합니다.
    newRotation = newRotation % 360;
  
    return newRotation;
  };
  

  const rotateRight = () => {
    let newRotation = rotation - angleIncrement;

    newRotation = newRotation % 360;

    setRotation(newRotation);
    setClosestCardRotation(newRotation);
    setActiveDotIndex((activeDotIndex + 1) % cards.length);
  };

  const rotateLeft = () => {
    let newRotation = rotation + angleIncrement;
  
    if (newRotation + closestCardRotation > 180) {
      newRotation -= 360;
    }
  
    // 회전이 360을 초과하거나 -360 미만일 경우 0으로 재설정합니다.
    newRotation = (newRotation + 360) % 360;
  
    setRotation(newRotation);
    setClosestCardRotation(newRotation);
    setActiveDotIndex((activeDotIndex - 1 + cards.length) % cards.length);
  };
  

  const handleClick = (index) => {
    let value = '';
    let backgroundImage = '';
  
    switch (index % cards.length) {
      case 0:
        value = 'come';
        backgroundImage = Come;
        break;
      case 1:
        value = 'fire';
        backgroundImage = Fire;
        break;
      case 2:
        value = 'forest';
        backgroundImage = Forest;
        break;
      case 3:
        value = 'sand';
        backgroundImage = Sand;
        break;
      default:
        value = '';
    }
  
    handleOptionChange(value);
    setBackgroundImage(backgroundImage);
  
    const documentHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: documentHeight,
      behavior: 'smooth',
    });
  };
  



  const dotComponents = cards.map((_, index) => (
    <Dot key={index} active={index === activeDotIndex} />
  ));

  const cardComponents = [];
  for (let i = 0; i < numberOfCards; i++) {
    const cardRotation = (i * angleIncrement + closestCardRotation) % 360;
    const verticalRotation = 90 - cardRotation;

    const CardComponent = cards[i % cards.length];

    cardComponents.push(
      <CardComponent
        key={i}
        style={{
          transform: `rotate(${verticalRotation}deg) translateY(-${radius}px)${isHovered[i] ? ' scale(1.1)' : ''}`,
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
        onClick={() => handleClick(i)} // 카드 클릭 시 handleClick 호출
      >
        {/* 카드 내용 */}
      </CardComponent>
    );
  }

  return (
    <Div>
      <CardsContainer>{cardComponents}</CardsContainer>
      <RotateLButton onClick={rotateLeft}>Rotate Left</RotateLButton>
      <DotWrapper>{dotComponents}</DotWrapper>
      <RotateRButton onClick={rotateRight}>Rotate Right</RotateRButton>
    </Div>
  );
};

const HomeSecond = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleOptionChange = (value) => {
    // do something with the selected option value
  };

  return (
    <div>
      <HomeSecondWrapper background={backgroundImage}>
        <GlobalStyle background={backgroundImage} />
        <CircleOfCards handleOptionChange={handleOptionChange} setBackgroundImage={setBackgroundImage} />
      </HomeSecondWrapper>
    </div>
  );
};

export default HomeSecond;
