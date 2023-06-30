import React from "react";
import HomeAboutPage from "../components/Web/Web-AboutPage/Web-AboutPage";
import styled from "styled-components";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
const About = ({setUser}) => {

    const AboutPageComponent = styled.div`
    `;

    return (
        <AboutPageComponent>
            
            <HomeAboutPage />
            <Hamburgerhome setUser={setUser} />
        </AboutPageComponent>

    )
}

export default About;