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

const Hamburgerhome= ({setUser})=>{
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
    return(

        <>
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
        </>
    )
};

export default Hamburgerhome