import React from "react";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import styled from "styled-components";
import Communitypage from "../components/Web/Web-HomePage/Web-community";
import { useMediaQuery } from 'react-responsive'
import Mobcommunity from "../components/Mobile/HomePage_Mob/Mob-community";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";

const CommunityPageComponent = styled.div`
`;
const Communityall = ({ setUser,user }) => {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });


    return (
        <CommunityPageComponent>
             {isDesktopOrMobile !== true ?
             <>
             <Hamburgerhome setUser={setUser} />
            <Communitypage user={user} />
            </>
            :
            <>
            <Mobcommunity user={user}/>
            <HamburgerMob setUser={setUser}/>   
            </>

             }
        </CommunityPageComponent>

    )
}

export default Communityall;