import React from "react";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
// import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
// import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";
import Hamburgerhome from "../components/Web/Web-HomePage/Web-Hamburgerhome";
import HamburgerMob from "../components/Mobile/HomePage_Mob/Mob-Hamburger";
import ForestVideoWeb from "../components/Web/Web-VideoPage/Web-ForstVideo";
import ForestVideoMob from "../components/Mobile/VideoPage_Mob/Mob-ForstVideo";

const Video = ({ setUser }) => {
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" });
  const VideoPageComponent = styled.div``;

  return (
    <VideoPageComponent>
      {isDesktopOrMobile !== true ? (
        <>
          <ForestVideoWeb />
          <Hamburgerhome setUser={setUser} />
        </>
      ) : (
        <>
          <ForestVideoMob />
          <HamburgerMob setUser={setUser} />
        </>
      )}
    </VideoPageComponent>
  );
};

export default Video;
