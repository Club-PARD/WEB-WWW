import React from "react";
import MypageHome from "../components/Web/Web-HomePage/MypageHomePage";
import styled from "styled-components";



const Mypage= ({user})=>{
    const MyPageComponent = styled.div`
        
    `;

    return(
        <MyPageComponent>
        <MypageHome user={user} />
        
        </MyPageComponent>

    )
}

export default Mypage;