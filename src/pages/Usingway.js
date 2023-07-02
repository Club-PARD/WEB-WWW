import React from "react";
import UsingHomePage from "../components/Web/Web-HomePage/Web-Usingway";
import styled from "styled-components";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";
import { useMediaQuery } from 'react-responsive'
import MobUsing from "../components/Mobile/HomePage_Mob/Mob-Usingway";
const Usingway = ({setUser}) => {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
    const UsingwayPageComponent = styled.div`
    `;

    return (
        <UsingwayPageComponent>
             {isDesktopOrMobile !== true ?
          <>
            <UsingHomePage />
            <Hamburgerhome setUser={setUser} />
            </>
            :
            <>
            <MobUsing/>
            <HamburgerMob setUser={setUser}/>
            </>
}
        </UsingwayPageComponent>

    )
}

export default Usingway;