import React, { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import mute from "../../../Assets/img/mute.png";
import muteno from "../../../Assets/img/muteno.png";



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



const Menu = styled.div`
  display: flex;
  position: absolute;
  top:-3px;
  margin-left: 75%;
  
  display: ${({ isArrow }) => (isArrow ? 'block' : 'none')};
  background-color: white; // 여기가 NavBar 투명도
  padding: 1rem 5rem;
  text-align: center;
  width: 300px;
  height: 767px;
 border-radius: 30px;
  z-index:999;
`;





const HomeFirst = () => {

  //const [backColor, setbackColor] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);

  const [isMuted, setIsMuted] = useState(false); // New state variable for mute status
  const [isArrow,setisArrow] = useState(false);
  const divRef = useRef(null);
  const videoRef = useRef(null); // New ref for the video
  const [showNav, setShowNav] = useState(false);


  //mute되는 toggle
  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const toggleMenu = ()=>{
    setisArrow(!isArrow)

}


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
    const scrollStep = distanceToScroll / 200;  // Change this to control the scroll speed
    const scrollInterval = 3;  // Change this to control the scroll frequency

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