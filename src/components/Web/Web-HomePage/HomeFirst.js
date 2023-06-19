import React from "react";
import { useState,useEffect } from "react";
import { styled } from "styled-components";



const VideoContainer = styled.div`

  position: sticky;
  top:0;
  width: 100%;
  height: 100vh;
  max-width: 100vw; 
  min-width: 1440px; // 아무리 줄여도 1440px로 유지됨
  background-color: ${({ isColor }) => (isColor ? ' rgba(0, 0, 0, 0.4)' : ' rgba(0, 0, 0, 0.4)')};
`;
const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: fill;
  z-index: -1;
`;

//inline-block으로 stickybox를 위로 올리는 역할을한다.
const DIVVVV = styled.div`
  display: inline-block;
  height: 8000px;
  width: 100%;
`;

function useScrollPosition() {
    const [scrollPos, setScrollPos] = useState(0);
  
    useEffect(() => {
      const updateScrollPos = () => {
        setScrollPos(window.pageYOffset);
      };
  
      window.addEventListener('scroll', updateScrollPos);
  
      return () => {
        window.removeEventListener('scroll', updateScrollPos);
      };
    }, []);
  
    return scrollPos;
  }



const HomeFirst=()=>{

    const [isColor,setisColor]=useState(true);
    const [backcolor, setbackcolor] = useState(true);// 배경색 조절


    const position = useScrollPosition();

 useEffect(() => {
    const absPosition = Math.abs(position);

}, [position]);
    return(
        <>
        <DIVVVV>
       <VideoContainer isColor={backcolor} >
        <VideoBackground  autoPlay loop muted playsInline>
      <source  playsInline muted autoPlay src={require("../../../Assets/Video/BackGroundVideo.mp4")} type="video/mp4" />
    </VideoBackground> 
    </VideoContainer>


        </DIVVVV>
        </>
    )
}


export default HomeFirst;