import React from "react";
import { styled } from "styled-components";
import HomeFirst from "../components/Web/Web-HomePage/HomeFirst";
import HomeSecond from "../components/Web/Web-HomePage/HomeSecond";
import HomeThrid from "../components/Web/Web-HomePage/HomeThrid";
import Hamburgerhome from "../components/Web/Web-HomePage/Hamburgerhome";

const Home = ({ setUser,setTime }) => { // setTime을 props로 받아옵니다.
    const HomePagecomponent = styled.div`    
    `
    
    return (
        <HomePagecomponent>
            <>
            <Hamburgerhome setUser={setUser} />
                <HomeFirst setUser={setUser}/>
                <HomeSecond />
                <HomeThrid setTime={setTime} />
            </>
        </HomePagecomponent>
    );
}

export default Home;