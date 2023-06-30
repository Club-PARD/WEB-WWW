import React from "react";
import styled from "styled-components";
import Writinghome from "../components/Web/Web-HomePage/Web-writing";


const WritingComponent = styled.div`
        
`;
const Writing=({user})=>{

  return(
    <>
    <WritingComponent>
      <Writinghome user={user}/>

    </WritingComponent>
    </>

  )
}

export default Writing