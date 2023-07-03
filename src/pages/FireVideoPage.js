import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";
import ForstVideoWeb from "../components/Web/Web-VideoPage/Web-FireVideo";
import ForstVideoMob from "../components/Mobile/VideoPage_Mob/Mob-FireVideo";

const Video = ({ setUser, user }) => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" });
  const AboutPageComponent = styled.div``;

  return (
    <AboutPageComponent>
      {isDesktopOrMobile !== true ? (
        <>
          <ForstVideoWeb setUser={setUser}/>
        </>
      ) : (
        <>
          <ForstVideoMob setUser={setUser}/>
          {/* <HamburgerMob setUser={setUser} /> */}
        </>
      )}
    </AboutPageComponent>
  );
};

export default Video;
