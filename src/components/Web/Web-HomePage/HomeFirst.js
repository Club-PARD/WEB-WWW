import React, { useState, useEffect, useRef } from "react";
import mute from "../../../Assets/img/mute.png";
import muteno from "../../../Assets/img/muteno.png";

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import { authService } from "../../../fbase";

import { 
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,


} from "firebase/auth";


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
//CSS 키 프레임 애니메이션
// CSS 애니메이션은 웹 페이지가 로드될 때 자동으로 시작되며, React 컴포넌트 라이프사이클이나 useEffect 훅과는 별개로 동작

const AnimatedText = styled.span`
  opacity: 0;
  font-size:50px;
  animation: ${textAnimation} 1s forwards;
  // animation 프로퍼티는 textAnimation 이라는 키 프레임 애니메이션을 1초 동안 수행하라고 지정
  animation-delay: ${({ delay }) => delay || '5s'};
  //글자가 한 글자씩 나타나는게 천천히 되도록 함
  //AnimatedText 컴포넌트의 delay prop을 통해 전달받고 있으며, 각 글자마다 0.2초씩 늘어
`;
const AnimatedMessageContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff; // Assuming you want white text
  z-index: 1; // Make sure the text appears above the video
`;
const AnimatedMessage = () => {
  const message = "Let's go change".split('');

  return (
    <AnimatedMessageContainer>
      {message.map((char, index) => (
        <AnimatedText key={index} delay={`${index * 0.2+0.2}s`}>
          {/*렌더링 된 후 0.2초가 지나서 글자들이 하나씩 나타나며
          글자 간에는 여전히 0.2초 간격 유지 */}
          {char}
        </AnimatedText>
      ))}
    </AnimatedMessageContainer>
  );
};
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
  position: fixed;
  right: 0;
  top: 0;
  width: ${({ isExpanded }) => (isExpanded ? "300px" : "0px")}; /* Adjust the width based on expansion */
  height: 100vh;
  background-color: #333; /* Change the background color here */
  transition: width 0.5s ease;
  z-index: 999;
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
  position: fixed;
  top: 0;
  right: 0;
  width:300px; /* Width of the expanded sidebar */
  height: 100%;
  background-color: #333; /* Change the background color here */
  transition: width 0.5s ease;
  z-index: 999;
  border-radius: 30px;
`;

const Menuside= styled.div`

display: flex;
flex-direction: column;
width: 100%;
height: 100%;
color: red;
border-radius: 20px;
 z-index: 999;
background-color: #333;
`



const MenuItem = styled(Link)`
text-decoration: none;

 line-height: 75px;
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


const HomeFirst = ({setUser}) => {

  //const [backColor, setbackColor] = useState(true);
  const [scrollEnd, setScrollEnd] = useState(false);

  const [isMuted, setIsMuted] = useState(false); // New state variable for mute status

  const divRef = useRef(null);
  const videoRef = useRef(null); // New ref for the video

  const [isExpanded, setIsExpanded] = useState(false);
  const[isLoggedin,setisLoggedin] = useState(false);
  const [UserObj,setUserObj] =useState(null);
  


useEffect(()=>{

  const auth= getAuth();
 onAuthStateChanged(auth,(user)=>{
    if(user){

    setisLoggedin(true);
    setUserObj(
      user
      //displayName : user.displayName,
      //uid: user.uid,
     // updateProfile: (args)=> updateProfile(user,{displayName:user.displayName}),
      //이 function은 rerturn 값으로 우리한테 진짜 user.updateProfile을 줄것

    )
    setUser(user)
  }else{
      setisLoggedin(false);
      setUserObj(null);
    }
  
  }

  );


})

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

const onSocialclick = async (event) => {
  const { target: { name } } = event;
  let provider;

  if (name === 'google') {
    provider = new GoogleAuthProvider();
    
    try {
      const data = await signInWithPopup(authService, provider);
      console.log(data);
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('User closed the login popup.');
      } else {
        console.error(error);
      }
    }
  }
};

  return (
    <>
    <DIVVVV ref={divRef}>

      <VideoContainer>
      <AnimatedMessage />
      <SidebarContainer isExpanded={isExpanded}>
        {isExpanded ? (
          <>
          
          <ExpandedSidebar>
        <Menuside>
          <MenuItem to='/Inquiry'>문의</MenuItem>
          <MenuItem to='/About'>소개</MenuItem>

          {UserObj ? <MenuItem>{UserObj.displayName}</MenuItem>
          :<MenuItem  name="google" onClick={onSocialclick}>로그인</MenuItem>}
           {isLoggedin ? <MenuItem to='/Mypage'>나의 페이지</MenuItem>:
           <MenuItem name="google" onClick={onSocialclick}>나의 페이지</MenuItem> }         
                    
                    
          <MenuItem to='/Otherpage'>다른 사람 페이지</MenuItem>
          <MenuItem to='/Community'>게시글보기</MenuItem>
        </Menuside>
     
        </ExpandedSidebar>
          <ExpandButton onClick={handleExpandSidebar}>{'<'}</ExpandButton>
          </>
        ) : (
     
          <ExpandButton onClick={handleExpandSidebar}>{'<'}</ExpandButton>
          
        )}
        </SidebarContainer>
     
        <VideoBackground ref={videoRef} autoPlay muted loop playsInline>
          <source playsInline autoPlay muted src={require("../../../Assets/Video/ForestVideo/video44.mp4")} type="video/mp4" />
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