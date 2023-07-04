import React, { useState, useEffect, useRef } from "react";

import xicon from "../../../Assets/img/Xicon.png";
import Hamburger from "../../../Assets/img/Hambutger.png";

import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import black from "../../../Assets/img/Logoblack.png";

import { 
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,


} from "firebase/auth";

const SidebarContainer = styled.div`
  position: fixed;
  right: 0;
  top: ${({ isExpanded }) => (isExpanded ? "0" : "-100vh")};
  width: 100%;
  height: 620px; // %,vh로 해놓으면 반응형으로 인해서 화면 세로가 줄면 같이 hamurger 줄어듬, 그래서 px로 고정
  background-color: white;
  transition: top 0.5s ease;
  z-index: 555;
  border-radius : 30px 0 0 30px;
  display: flex;
  flex-direction: column;
`;
const ExpandButton = styled.button`
 position: absolute;
  width:36px;
  height:36px;
  left: 88%;
  top:5px;


border:none;
  cursor: pointer;
  z-index: 999;
  background: rgba(0,0,0,0);
`;
const ExpandButton1 = styled.button`
line-height: 70px;
width: 36px;
height: 36px;
font-size: 36px;
margin-top: 5px;

padding-right: 40px;

  background-color: white;
  border: none;
  color: black;
  cursor: pointer;
  z-index: 2;
`;

const ExpandedSidebar = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width:340px; /* Width of the expanded sidebar */
  height: 100%;
  background-color: white; /* Change the background color here */

  z-index: 999;

  transition: width 0.5s ease;
`;

const Menuside= styled.div`

display: flex;
flex-direction: column;
width: 100%;
height: 100%;
color: red;
border-radius: 20px;
 z-index: 999;
background-color: white;

`

const MenuItemLogin = styled.div.attrs(props => ({
  name: props.name
}))`

text-align: right;
    width: 100%; // Add this
padding-right: 27px;
  height: 85px;
  color: #808080;
  font-size: 16px;
  font-family: NanumSquare Neo variable;
  font-weight: 500;
  line-height: 70px;
  
  cursor: pointer;
`;

const MenuLogout= styled.div`
color: #808080;
text-align: center;
font-size: 16px;
font-family: NanumBarunGothic;
font-weight: 600;
line-height: 140%;
letter-spacing: 0.4px;
width:59px;
height:22px;
margin-top: 70px;
margin-left: 300px;
cursor:pointer;
`


const MenuItemLink1 = styled(Link).attrs(props => ({
  name: props.name
}))`
text-decoration: none;

color: #0F1011;

/* Main/Header/H3-32 R */
font-size: 16px;
font-family: NanumSquare Neo variable;
font-weight: 300;
line-height: 60px; // 글자 세로 위치
  
  //width: 100%;
  width: 250px;
  margin-left: 20%;
  height: 60px;

  text-align: center;
  cursor: pointer;
  color: black;
  &:hover {
    background: rgba(0, 0, 0, 1);
 //padding-left: 32px;
   width: 250px;
    color:white;
  


  }
`;
const MenuItemLink = styled(Link).attrs(props => ({
  name: props.name
}))`
text-decoration: none;
border-bottom : 1px solid #000;
color: #0F1011;

/* Main/Header/H3-32 R */
font-size: 16px;
font-family: NanumSquare Neo variable;
font-weight: 300;
line-height: 60px; // 글자 세로 위치
  
  //width: 100%;
  width: 250px;
  margin-left: 20%;
  height: 60px;

  text-align: center;
  cursor: pointer;
  color: black;
  &:hover {
    background: rgba(0, 0, 0, 1);
 //padding-left: 32px;
   width: 250px;
    color:white;
  


  }
`;
const Line= styled.div`
margin-left: 20%;
background: #0F1011;
width: 250px;
height: 1px;


`
const Img=styled.img`
width:36px;
height: 36px;

`

const ImgLink = styled(Link)`
margin-left: 10px;
margin-top: 20px;

`
const HamburgerMob= ({setUser})=>{
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
      
          );
         setUser(user);
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

        const onSocialclick = async (name) => {
          let provider;
          if (name === 'google') {
            provider = new GoogleAuthProvider();
            const auth = getAuth();
            try {
              const data = await signInWithPopup(auth, provider);
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
        
        
        const handleLogout = async () => {
          const auth = getAuth();
        
          try {
            await signOut(auth);
            console.log("You've successfully logged out!");
          } catch (error) {
            console.error("Error signing out:", error);
          }
        };

    return(

        <>
        <ExpandButton onClick={handleExpandSidebar}>
        <Img src={Hamburger}/>
      </ExpandButton>
  
  
          <SidebarContainer isExpanded={isExpanded}>
          {isExpanded && 
            <>
            
            <ExpandedSidebar>
            
          <Menuside>
          <div style={{display:'flex'}}>
          <ImgLink><img style={{width:"128px", height:"30px"}} src={black} /></ImgLink>
      
          {isLoggedin? 
             (<MenuItemLogin>{UserObj.displayName}</MenuItemLogin>)
          :
             (<MenuItemLogin  onClick={() => onSocialclick('google')}>로그인</MenuItemLogin>)}
             <ExpandButton1 onClick={handleExpandSidebar}><Img src={xicon}/> </ExpandButton1>
            
             </div>
    
             
          
             <MenuItemLink to='/'>홈</MenuItemLink>
          
  
  {isLoggedin ? 
      <MenuItemLink to='/Mypage'>마이 페이지</MenuItemLink>
    :
      <MenuItemLink onClick={() => onSocialclick('google')}>마이 페이지</MenuItemLink> }
  
          
  
  
            {isLoggedin ? 
              <MenuItemLink to='/Community'>쉼터</MenuItemLink>
            :
              <MenuItemLink onClick={() => onSocialclick('google')}>쉼터</MenuItemLink> }
            
            
            
        
            
  
            {isLoggedin ? 
              <MenuItemLink to='/Writing'>기록하기</MenuItemLink>
            :
              <MenuItemLink onClick={() => onSocialclick('google')}>기록하기</MenuItemLink> }
                      
              
              <MenuItemLink to='/About'>서비스 소개</MenuItemLink>
          
              <MenuItemLink to='/Using'>이용방법</MenuItemLink>
         
              <MenuItemLink1 to='/Inquiry'>문의</MenuItemLink1>
           
  
                      {isLoggedin ? <MenuLogout onClick={handleLogout}>Logout</MenuLogout> : null}      
                      
          
                      </Menuside>
          
         </ExpandedSidebar>
         
  
       
      
          </> }
            </SidebarContainer>
  
  
            </>
    )
};
{/*<ExpandButton1 onClick={handleExpandSidebar}>{'X'}</ExpandButton1> */}

export default HamburgerMob