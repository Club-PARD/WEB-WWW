import React from "react";
import MypageHome from "../components/Web/Web-HomePage/MypageHomePage";
import styled from "styled-components";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";

const Mypage = ({ user, setUser }) => {
    const MyPageComponent = styled.div`
        
    `;

    return (
        <MyPageComponent>
            <Hamburgerhome setUser={setUser} />
            <MypageHome user={user} />
        </MyPageComponent>
    )
}

export default Mypage;