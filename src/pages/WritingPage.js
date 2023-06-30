import React from "react";
import styled from "styled-components";
import Writinghome from "../components/Web/Web-HomePage/Web-writing";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";

const WritingComponent = styled.div`
        
`;
const Writing=({user,setUser})=>{

  return(
    <>
    <WritingComponent>
   
      <Writinghome user={user}/>
      <Hamburgerhome setUser={setUser} />
    </WritingComponent>
    </>

  )
}

export default Writing