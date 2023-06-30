import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../../../Assets/img/Logowhite.png';
import AnimatedNumbers from 'react-animated-numbers';

const DIVV = styled.div`
  display: flex;
  height: 100vh;
  color: white;
  font-size: 100px;
`;

const DDiv = styled.div`
  display: flex;
  width: 1246px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  margin-left: 180px;
  margin-top: 405px;
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
  margin-left: 30px;
`;

const FourBox = styled.div`
  display: flex;
  margin-top: -90px;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  margin-left: 300px;
  letter-spacing:2px;
`;

const LogoBox = styled.img`
  margin-left: -270px;
  scale: 30%;
  z-index: 3;
`;

const Space = styled.span`
  margin-right: 5px;
`;

function RealTimeUser() {
  const [randomNumber, setRandomNumber] = useState(500);

  // 5초 간격으로 랜덤한 숫자를 생성합니다.
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 101) - 50; // -50 to 50
      setRandomNumber(prevNumber => Math.min(Math.max(prevNumber + change, 100), 1000));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <DIVV>
        <div className="Barun-GothicB-font">
          <DDiv>
            <FirstBox>여러분은 온전히 '나'에게 몰입하는 시간을 충분히 갖고 있나요?</FirstBox>
            <SecondBox>스스로를 들여다 봤을 때 어딘가 불안하거나, 불편하고, 지쳐있지 않나요?</SecondBox>
            <ThirdBox>지쳐있는 우리 마음에는 쉼이 필요해요.</ThirdBox>
            <LogoBox src={Logo} alt="Logo" />
            <FourBox>
            <Space>과</Space>
              <AnimatedNumbers
                animateToNumber={randomNumber}
                fontStyle={{ fontSize: 30 }}
                includeComma
                config={{ tension: 89, friction: 3, duration: 1000 }}
              />
              명이 함께 하고 있어요.
            </FourBox>
          </DDiv>
        </div>
      </DIVV>
    </div>
  );
}

export default RealTimeUser;
