import React from "react";
import { styled } from "styled-components";
import HomeFirst from "../components/Web/Web-HomePage/HomeFirst";
import HomeThrid from "../components/Web/Web-HomePage/HomeThrid";
import Hamburgerhome from "../components/Web/Web-HomePage/Hamburgerhome";

const Home = ({ setUser,setTime }) => { // setTime을 props로 받아옵니다.

    
    return (

            <>
            <Hamburgerhome setUser={setUser} />
                <HomeFirst setUser={setUser}/>
                {/* <HomeSecond /> */}
                <HomeThrid setTime={setTime} />
            </>
        
    );
}

export default Home;