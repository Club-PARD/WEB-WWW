import React from "react";
import { styled } from "styled-components";
import HomeFirst from "../components/Web/Web-HomePage/HomeFirst";
import HomeSecond from "../components/Web/Web-HomePage/HomeSecond";
import HomeThrid from "../components/Web/Web-HomePage/HomeThrid";

const Home = ({ setTime }) => { // setTime을 props로 받아옵니다.
    const HomePagecomponent = styled.div`    
    `
    
    return (
        <HomePagecomponent>
            <>
                <HomeFirst />
                <HomeSecond />
                <HomeThrid setTime={setTime} />
            </>
        </HomePagecomponent>
    );
}

export default Home;