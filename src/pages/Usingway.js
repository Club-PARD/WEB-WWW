import React from "react";
import UsingHomePage from "../components/Web/Web-HomePage/Web-Usingway";
import styled from "styled-components";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
const Usingway = ({setUser}) => {

    const UsingwayPageComponent = styled.div`
    `;

    return (
        <UsingwayPageComponent>
          
            <UsingHomePage />
            <Hamburgerhome setUser={setUser} />
        </UsingwayPageComponent>

    )
}

export default Usingway;