import React from "react";

import styled from "styled-components";
import Communitypage from "../components/Web/Web-HomePage/Web-community";
const Communityall= ({user})=>{
    
    const CommunityPageComponent = styled.div`
    `;

    return(
        <CommunityPageComponent>
        <Communitypage user={user}/>
       </CommunityPageComponent>

    )
}

export default Communityall;