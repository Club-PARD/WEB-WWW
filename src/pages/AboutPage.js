import React from "react";
import HomeAboutPage from "../components/Web/Web-AboutPage/Web-AboutPage";
import styled from "styled-components";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import { useMediaQuery } from "react-responsive";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";
import MobAbout from "../components/Mobile/HomePage_Mob/Mob-About";
const About = ({setUser}) => {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
    const AboutPageComponent = styled.div`
    `;

    return (
        <AboutPageComponent>
             {isDesktopOrMobile !== true ?
             <>
            <HomeAboutPage />
            <Hamburgerhome setUser={setUser} />
            </>
            :
            <>
            
            <MobAbout/>
            <HamburgerMob setUser={setUser} />
            </>}
        </AboutPageComponent>

    )
}

export default About;