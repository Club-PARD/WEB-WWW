import React from "react";
import { styled } from "styled-components";
import HomeFirst from "../components/Web/Web-HomePage/HomeFirst";
import HomeSecond from "../components/Web/Web-HomePage/HomeSecond";
import HomeThrid from "../components/Web/Web-HomePage/HomeThrid";

const Home= ()=>{
    const HomePagecomponent= styled.div`
    
    `

    return(
        <HomePagecomponent>
        <>
       <HomeFirst/>
       <HomeSecond/>
       <HomeThrid/> 
        </>
        </HomePagecomponent>
    );
}

export default Home;