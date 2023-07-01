import React from "react";
import styled from "styled-components";
import Writinghome from "../components/Web/Web-HomePage/Web-writing";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import { useMediaQuery } from 'react-responsive'
import MobWriting from "../components/Mobile/HomePage_Mob/Mob-Writing";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";
const WritingComponent = styled.div`
        
`;
const Writing=({user,setUser})=>{
  const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
  return(

    <WritingComponent>
                {isDesktopOrMobile !== true ?
             <>
      <Writinghome user={user}/>
      <Hamburgerhome setUser={setUser} />
      </>
      :
      <>
      <HamburgerMob setUser={setUser}/>
      <MobWriting user={user}/>
      </>
}
    </WritingComponent>
 

  )
}

export default Writing