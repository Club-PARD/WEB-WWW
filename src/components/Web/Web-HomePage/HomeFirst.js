import React, { useState, useEffect, useRef } from "react";
import mute from "../../../Assets/img/mute.png";
import muteno from "../../../Assets/img/muteno.png";

import { styled } from "styled-components";

const VideoContainer = styled.div`
  position: sticky;
  top:0;
  width: 100%;
  height: 100vh;
  max-width: 100vw; 
  min-width: 1440px;
  background-color: ${({ isColor }) => (isColor ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.4)')};
`;
const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: -1;
`;

const DIVVVV = styled.div`
  display: inline-block;
  height: 2000px;
  width: 100%;
`;
const MuteButton = styled.img`

  position: absolute;
  width: 50px;
  height: 50px;
  right: 100px;
  top: 20px;
  cursor: pointer;
  z-index: 1;
`; // mutebutton



const SidebarContainer = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${({ isExpanded }) => (isExpanded ? "300px" : "0px")}; /* Adjust the width based on expansion */
  height: 100vh;
  background-color: #333; /* Change the background color here */
  transition: width 0.5s ease;
  z-index: 8;
  border-radius: 30px;
`;

const ExpandButton = styled.button`
  position: absolute;
  top: 20px;
  left: -40px;
  width: 40px;
  height: 40px;
  background-color: red;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 2;
`;

const ExpandedSidebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 300px; /* Width of the expanded sidebar */
  height: 100%;
  background-color: #333; /* Change the background color here */
  transition: width 0.5s ease;
  z-index: -4;
  border-radius: 30px;
`;

const Menuside= styled.div`
position: absolute;
display: flex;
flex-direction: column;
width:100%;
height: 100%;
color: red;
border-radius: 20px;

background-color: #333;
`



const MenuItem = styled.div`
 line-height: 70px;
  padding: 10px;
  //width: 100%;
  height: 80px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const LoginForm = styled.div`
  display: ${({ open }) => (open ? "block" : "none")};
  color: #fff;
`;

const InputField = styled.textarea`
  margin-top: 10px;
  padding: 5px;
  outline: none;
  border: none;
  border-radius: 5px;
`;
const HomeFirst = () => {

  //const [backColor, setbackColor] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);

  const [isMuted, setIsMuted] = useState(false); // New state variable for mute status

  const divRef = useRef(null);
  const videoRef = useRef(null); // New ref for the video

  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginFormOpen(!isLoginFormOpen);
  };


  const handleExpandSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  //mute되는 toggle
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };


/*
  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }
  }; //전체 페이지의 높이를 가져와 스크롤의 최대 범위 제한
*/

  const handleScroll = () => {
    const { scrollTop, clientHeight } = document.documentElement;
    const divHeight = divRef.current.clientHeight;

    if (scrollTop + clientHeight >= divHeight) {
      setScrollEnd(true);
    } else {
      setScrollEnd(false);
    }

};

  const handleWheel = (event) => {
    event.preventDefault();
    const deltaY = event.deltaY * 15; // 스크롤 속도 조절
    const { scrollTop, clientHeight } = document.documentElement;
    const divHeight = divRef.current.clientHeight;

    if (deltaY > 0 && scrollTop < divHeight - clientHeight) {
      window.scrollBy({
        top: deltaY,
        behavior: "smooth",
      });
    } else if (deltaY < 0 && scrollTop > 0) {
      window.scrollBy({
        top: deltaY,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);


useEffect(() => {
  if (scrollEnd) {
    const { scrollHeight, clientHeight, scrollTop } = document.documentElement;
    const distanceToScroll = scrollHeight - clientHeight - scrollTop;
    const scrollStep = distanceToScroll / 60;  // Change this to control the scroll speed
    const scrollInterval = 18;  // Change this to control the scroll frequency

    let totalScrolled = 0;
    const scrollAnimation = setInterval(() => {
      if (totalScrolled >= distanceToScroll) {
        clearInterval(scrollAnimation);
      } else {
        window.scrollBy(0, scrollStep);
        totalScrolled += scrollStep;
      }
    }, scrollInterval);
  }
}, [scrollEnd]);
// HomeSecond 컴포넌트를 느리게 호출한다.

  return (
    <>
    <DIVVVV ref={divRef}>

      <VideoContainer>
        
      <SidebarContainer isExpanded={isExpanded}>
        {isExpanded ? (
          <>
          
          <ExpandedSidebar>
        <Menuside>
          <MenuItem>문의</MenuItem>
          <MenuItem>소개</MenuItem>
          <MenuItem onClick={handleLoginClick}>로그인</MenuItem>
          <LoginForm open={isLoginFormOpen}>
            <InputField type="password" placeholder="비밀번호를 입력하세요." />
          </LoginForm>
        </Menuside>
      </ExpandedSidebar>
      
          <ExpandButton onClick={handleExpandSidebar}>{'<'}</ExpandButton>
          </>
        ) : (
     
          <ExpandButton onClick={handleExpandSidebar}>{'<'}</ExpandButton>
          
        )}
        </SidebarContainer>
     
        <VideoBackground ref={videoRef} autoPlay muted loop playsInline>
          <source playsInline autoPlay muted src={require("../../../Assets/Video/video44.mp4")} type="video/mp4" />
        </VideoBackground>
       
        {isMuted===true? 
        <MuteButton src={muteno} onClick={toggleMute} /> :
        <MuteButton  src={mute} onClick={toggleMute} />}


          
       


      </VideoContainer>
    </DIVVVV>
  </>
  );
};

export default HomeFirst;