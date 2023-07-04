import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../../../Assets/img/Logowhite.png";
import AnimatedNumbers from "react-animated-numbers";
import scrolldown from "../../../Assets/img/scrolldown.png";

const PartDiv = styled.div`
  height: 100vh;
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  place-content: center;
  margin: 0 auto;
`;

const DDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-shrink: 0;
`;

const DIVV = styled.div`
  display: flex;
  color: white;
  flex-direction: row;
  font-size: 24px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const FirstBox = styled.div`
  margin-top: 100px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 180%;
  letter-spacing: 0px;
  z-index: 3;
`;

const SecondBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  font-size: 12px;
`;

const ThirdBox = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

const FourBox = styled.div`
  display: flex;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  // margin-left: 300px;
  letter-spacing: 1px;
`;

const LogoBox = styled.img`
  position: relative;
  z-index: 3;
  width: 80px;
`;

const Space = styled.span`
  margin-right: 5px;
`;

const ScrolldownBox = styled.img`
  align-items: center;
  justify-content: center;
  margin-top: 25vh;
  scale: 80%;
`;

function MobRealTimeUser() {
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
      <PartDiv>
        <DIVV>
          <div className="Barun-GothicB-font">
            <DDiv>
              <FirstBox>
                여러분은 <br />
                온전히 '나'에게 <br />
                몰입하는 시간을
                <br /> 충분히 갖고 있나요?
              </FirstBox>
            </DDiv>
          </div>
          <div className="Barun-GothicL-font">
            <SecondBox>
              스스로를 들여다 봤을 때 어딘가 불안하거나, 불편하고, 지쳐있지
              않나요?
            </SecondBox>
            <ThirdBox>지쳐있는 우리 마음에는 쉼이 필요해요.</ThirdBox>
          </div>
          <div className="Barun-Gothic-font">
            <FourBox>
              <LogoBox src={Logo} alt="Logo" />
              <Space></Space>
              <Space>과</Space>
              <AnimatedNumbers
                animateToNumber={randomNumber}
                fontStyle={{ fontSize: 14 }}
                includeComma
                config={{ tension: 89, friction: 3, duration: 1000 }}
              />
              명이 함께 하고 있어요.
            </FourBox>
          </div>
        </DIVV>
        <ScrolldownBox src={scrolldown} alt="scrolldown" />
      </PartDiv>
    </div>
  );
}

export default MobRealTimeUser;
