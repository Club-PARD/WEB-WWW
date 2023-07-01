import React from "react";
import MypageHome from "../components/Web/Web-HomePage/MypageHomePage";
import styled from "styled-components";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import { useMediaQuery } from 'react-responsive'
import MobMypage from "../components/Mobile/HomePage_Mob/Mob-Mypage";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";

const Mypage = ({ user, setUser }) => {
    const isDesktopOrMobile = useMediaQuery({ query: '(max-width:768px)' });
    const MyPageComponent = styled.div`
        
    `;

    return (
        <MyPageComponent>
            {isDesktopOrMobile !== true ?
            <>
            <Hamburgerhome setUser={setUser} />
            <MypageHome user={user} />
            </>
            :
            <>
            <MobMypage user={user} /> 
            <HamburgerMob setUser={setUser}/>      
            </>

        }
        </MyPageComponent>
    )
}

export default Mypage;