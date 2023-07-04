import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../../Assets/img/Logowhite.png";
import AnimatedNumbers from "react-animated-numbers";
import scrolldown from "../../../Assets/img/scrolldown.png";

const DIVV = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  color: white;
  font-size: 100px;
  justify-content: center;
  align-items: center;
`;

const DDiv = styled.div`
  margin-top: 600px;
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
`;

const FirstBox = styled.div`
  width: 1400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  line-height: 140%;
  text-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  letter-spacing: 2px;
`;

const SecondBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  font-size: 30px;
`;

const ThirdBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const FourBox = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  // margin-left: 300px;
  letter-spacing: 2px;
`;

const LogoBox = styled.img`
  position: relative;

  z-index: 3;
  width: 150px;
`;

const Space = styled.span`
  margin-right: 5px;
`;

const ScrolldownBox = styled.img`
  margin-top: -150px;
  scale: 8%;
`;

function RealTimeUser() {
  const [randomNumber, setRandomNumber] = useState(500);

  // 5초 간격으로 랜덤한 숫자를 생성합니다.
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 101) - 50; // -50 to 50
      setRandomNumber((prevNumber) =>
        Math.min(Math.max(prevNumber + change, 100), 1000)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <DIVV>
        <div className="Barun-Gothic-font">
          <DDiv>
            <FirstBox>
              여러분은 온전히 '나'에게 몰입하는 시간을 충분히 갖고 있나요?
            </FirstBox>
            <SecondBox>
              스스로를 들여다 봤을 때 어딘가 불안하거나, 불편하고, 지쳐있지
              않나요?
            </SecondBox>
            <ThirdBox>지쳐있는 우리 마음에는 쉼이 필요해요.</ThirdBox>
            <FourBox>
              <LogoBox src={Logo} alt="Logo" />
              <Space></Space>
              <Space>과</Space>
              <AnimatedNumbers
                animateToNumber={randomNumber}
                fontStyle={{ fontSize: 30 }}
                includeComma
                config={{ tension: 89, friction: 3, duration: 1000 }}
              />
              명이 함께 하고 있어요.
            </FourBox>
            <ScrolldownBox src={scrolldown} alt="scrolldown" />
          </DDiv>
        </div>
      </DIVV>
    </div>
  );
}

export default RealTimeUser;
