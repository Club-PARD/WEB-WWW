import React from "react";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import styled from "styled-components";
import Communitypage from "../components/Web/Web-HomePage/Web-community";


const CommunityPageComponent = styled.div`
`;
const Communityall = ({ setUser,user }) => {



    return (
        <CommunityPageComponent>
             <Hamburgerhome setUser={setUser} />
            <Communitypage user={user} />
        </CommunityPageComponent>

    )
}

export default Communityall;