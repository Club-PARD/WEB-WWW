import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  width: 100%;
  height: 850px;
  display: flex;
  overflow: hidden;
`;

const CardsContainer = styled.div`
  position: relative;
  display: inline-block;
  padding-top: 1700px; // 기본값
  padding-left: 1150px; // 기본값

  // 화면 너비가 1440px 이하일 때 적용
  @media (max-width: 1440px) {
    padding-top: 1700px;
    padding-left: 1150px;
  }

  // 화면 너비가 1024px 이하일 때 적용
  @media (max-width: 1024px) {
    padding-top: 1300px;
    padding-left: 800px;
  }
`;


const CardWrapper = styled.div`
  width: 350px;
  height: 500px;
  background-color: #ccc;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform-origin: center;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
    background-color: #f00;
    color: #fff;
  }
`;

const Card1 = styled(CardWrapper)`
  background-color: #ff0000;
  color: #fff;
  z-index: 1;
`;

const Card2 = styled(CardWrapper)`
  background-color: #00ff00;
  color: #000;
`;

const Card3 = styled(CardWrapper)`
  background-color: #0000ff;
  color: #fff;
`;

const Card4 = styled(CardWrapper)`
  background-color: #ffff00;
  color: #000;
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Dot = styled.div`
  width: ${({ active }) => (active ? '30px' : '10px')};
  height: 10px;
  background-color: ${({ active }) => (active ? 'red' : 'grey')};
  margin: 0 5px;
  transition: width 0.3s ease-in-out;
`;

const CircleOfCards = () => {
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [closestCardRotation, setClosestCardRotation] = useState(0);
  const [activeDotIndex, setActiveDotIndex] = useState(0);

  const numberOfCards = 12;
  const angleIncrement = 360 / numberOfCards;
  const radius = 1100;

  const cards = [Card1, Card2, Card3, Card4];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (dragging) {
        const newRotation = rotation - (e.clientX - startX) * 0.5;
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
      
      // snapping 기능 추가
      const targetRotation = Math.round(rotation / angleIncrement) * angleIncrement;
      setRotation(targetRotation);
      setClosestCardRotation(targetRotation);
      setActiveDotIndex(Math.abs(Math.round(targetRotation / angleIncrement) % cards.length));
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
          transform: `rotate(${verticalRotation}deg) translateY(-${radius}px)`,
        }}
      >
        {/* 카드 내용 */}
      </CardComponent>
    );
  }

  return (
    <Div>
      <DotWrapper>{dotComponents}</DotWrapper>
      <CardsContainer>{cardComponents}</CardsContainer>
    </Div>
  );
};


const App = () => {
  return <CircleOfCards />;
};

export default App;
