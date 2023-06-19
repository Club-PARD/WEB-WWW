import React from "react";

import HomeFirst from "../components/Web/Web-HomePage/HomeFirst";
import { styled } from "styled-components";
import HomeSecond from "../components/Web/Web-HomePage/HomeSecond";

const Home= ()=>{
    const HomePagecomponent= styled.div`
    
    `

    return(
        <HomePagecomponent>
        <>
       <HomeFirst/>
       <HomeSecond/>
       
        </>
        </HomePagecomponent>
    );
}

export default Home;