import React, { useState, useRef, useEffect } from "react";
import mute from "../../../Assets/img/mute.png";
import muteno from "../../../Assets/img/muteno.png";
import Real from "../../Web/Web-HomePage/Web-HomeReal";
import styled, { keyframes } from "styled-components";
import HomeSecond from "./Web-HomeSecond";
import HomeThird from "./Web-HomeThrid";
import { FullPage, Slide } from 'react-full-page';

const textAnimation = keyframes`
  0% { 
    opacity: 0; 
    transform: translateX(-100px); 
  }
  100% { 
    opacity: 1; 
    transform: translateX(0);
  }
`;

const AnimatedText = styled.span`
  opacity: 0;
  font-size: 50px;
  animation: ${textAnimation} 1s forwards;
  animation-delay: ${({ delay }) => delay || '5s'};
`;

const AnimatedMessageContainer = styled.div`
  position: absolute;
  width:400px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 1;
`;


const AnimatedMessage = () => {
  const message = "Let's go change".split('');

  return (
    <AnimatedMessageContainer>
      {message.map((char, index) => (
        <AnimatedText key={index} delay={`${index * 0.2 + 0.2}s`}>
          {char}
        </AnimatedText>
      ))}
    </AnimatedMessageContainer>
  );
};

const VideoBackground = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
`;

const SectionContainer = styled.div`
  position: relative;
  height: 100vh;
`;

const MuteButton = styled.img`
  position: absolute;
  width: 50px;
  height: 50px;
  right: 100px;
  top: 20px;
  cursor: pointer;
  z-index: 1;
`;

const HomeFirst = ({ setUser }) => {
  const [isMuted, setIsMuted] = useState(false);
  const divRef = useRef(null);
  const videoRef = useRef(null);

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div ref={divRef}>
      <VideoBackground ref={videoRef} autoPlay muted loop playsInline>
        <source playsInline autoPlay muted src={require("../../../Assets/Video/ForestVideo/video44.mp4")} type="video/mp4" />
      </VideoBackground>

      <FullPage>
        <Slide>
          <AnimatedMessageContainer>
            <AnimatedMessage />
          </AnimatedMessageContainer>
        </Slide>

        <Slide>
          <SectionContainer>
            <Real />
          </SectionContainer>
        </Slide>

        {isMuted ? (
          <MuteButton src={muteno} onClick={toggleMute} />
        ) : (
          <MuteButton src={mute} onClick={toggleMute} />
        )}

        <Slide>
          <HomeSecond></HomeSecond>
        </Slide>
        <HomeThird></HomeThird>
      </FullPage>
    </div>

  );
};

export default HomeFirst;
