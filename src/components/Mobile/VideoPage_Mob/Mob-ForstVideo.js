import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { StorageService } from "../../../fbase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled, { css } from "styled-components";
import HamburgerMob from "../HomePage_Mob/Mob-Hamburger";
import LogoImage from "../../../Assets/img/Logowhite.png";
import Mute from "../../../Assets/img/mute2.png";
import NotMute from "../../../Assets/img/muteno2.png";
import Play from "../../../Assets/img/Play.png";
import Pause from "../../../Assets/img/Pause.png";
import Arrow1 from "../../../Assets/img/arrow1.png";
import Arrow2 from "../../../Assets/img/arrow2.png";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/118176-day-and-night-transition-scene";
import Modal from "./Mob-modal";

const PartDiv = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TopWrapper = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  top: 0;
  z-index: 2;
`;

const Logo = styled.img`
  width: 127.2px;
  height: 35px;
  flex-shrink: 0;
  z-index: 2;
  margin-top: 17.5px;
  margin-left: 16px;
`;

const AudioArrowWrapper = styled.div`
  width: 300px;
  height: 520px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  flex-shrink: 0;
  border-radius: 16px;
  border: 0.8px solid var(--main-white, #f2f2f2);
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(12px);
  transition: transform 0.3s ease;

  ${(props) =>
    props.move &&
    css`
      transform: translateX(-100%) translate(-50%, -50%);
    `}

  ${(props) =>
    props.ended &&
    css`
      transform: translateX(-130%) translate(-50%, -50%);
    `}
`;

const ArrowWrapper = styled.div`
  position:absolute;
  margin-left: 90%;
  margin-top: -80%;
  z-index: 2;
  width: 54px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 15px;
  background: var(--main-white, #f2f2f2);
  cursor: pointer;
`;

const Arrow = styled.img`
  position: absolute;
  left: 12.5px;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  margin-top: 10px;
`;

const AllAudioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AllMuteText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--main-white, #f2f2f2);
    font-size: 20px;
    font-family: NanumSquare Neo variable;
    font-weight: 100;
    line-height: 140%;
    margin-top: 24px;
    margin-left: 30px;
    margin-right: 145.8px;
  `;
const AllAudioMuteButton = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-top: 20px;
  z-index: 1;
  cursor: pointer;
`;


const OneAudioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OneAudioWrapper1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 35px;
`;

const OneAudioWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 35px;
  transform: translateX(-55px);
`;

const VideoMuteImage = styled.img`
  width: 16px;
  height: 16px;
  /* margin-left: -55px; */
`;

const AudioMuteImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: -205px;
`;

const PlayPauseImage = styled.img`
  width: 16px;
  height: 16px;
  margin-left: -130px;
  margin-top: 4px;
`;

const AudioSlider = styled.input`
  margin-top: 20px;
  margin-left: -170px;
  z-index: 1;
  width: 150px;
  height: 3px;
  background-color: #ffffff;
  appearance: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #ffffff;
    cursor: pointer;
  }
`;

const LoadingAnimationWrapper = styled.div``;

const ForestVideoMob = ({ user, setUser, time }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoURL, setVideoURL] = useState("");
  const [audioURLs, setAudioURLs] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState([]);
  const [isAudioAllMuted, setIsAudioAllMuted] = useState(false);
  const [audioVolumes, setAudioVolumes] = useState([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState([]);
  const [arrowImageIndex, setArrowImageIndex] = useState(1);
  const [audioArrowVisible, setAudioArrowVisible] = useState("");
  const [isMoved, setIsMoved] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAudioArrowExpanded, setIsAudioArrowExpanded] = useState(true);
  const audioRefs = useRef([]);
  const videoRef = useRef("");

  const muteTexts = [
    "배경소리",
    "새소리",
    "바람소리",
    "비소리",
    "벌레 소리",
    "풀숲 걷는 소리",
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVideoEnded = () => {
    openModal();
    setArrowImageIndex(1);
    setIsAudioArrowExpanded(false);
    setIsMoved(true);
    setIsEnded(true);
  };

  const handleDivAClick = () => {
    setIsMoved(!isMoved);
    setArrowImageIndex((prevIndex) => (prevIndex === 1 ? 2 : 1));
    setAudioArrowVisible(false);
  };

  const handleAudioTogglePlay = (index) => {
    setIsAudioPlaying((prevIsPlaying) => {
      const newIsPlaying = [...prevIsPlaying];
      newIsPlaying[index] = !newIsPlaying[index];
      return newIsPlaying;
    });

    if (audioRefs.current[index].paused) {
      audioRefs.current[index].play();
    } else {
      audioRefs.current[index].pause();
    }
  };

  const handleAudioVolumeChange = (event, index) => {
    const newVolume = parseFloat(event.target.value);
    if (!isAudioMuted[index]) {
      setAudioVolumes((prevVolumes) => {
        const newVolumes = [...prevVolumes];
        newVolumes[index] = newVolume;
        return newVolumes;
      });
      if (audioRefs.current[index]) {
        audioRefs.current[index].volume = newVolume;
      }
    }
  };

  const handleAllSoundToggleMute = () => {
    setIsAudioAllMuted((prevIsMuted) => !prevIsMuted);

    audioRefs.current.forEach((audio) => {
      audio.muted = !isAudioAllMuted;
    });
  };

  const handleAudioToggleMute = (index) => {
    setIsAudioMuted((prevIsMuted) => {
      const newIsMuted = [...prevIsMuted];
      newIsMuted[index] = !prevIsMuted[index];
      return newIsMuted;
    });

    if (audioRefs.current[index]) {
      audioRefs.current[index].muted = !isAudioMuted[index];
    }
  };

  const saveAudioVolumes = async (audioVolumes, userId) => {
    if (!user) {
      return;
    }
    const audioVolumesRef = doc(dbService, "audioVolumes", userId);
    await setDoc(audioVolumesRef, { volumes: audioVolumes });
  };

  const loadAudioVolumes = async (userId) => {
    if (!user) {
      return;
    }

    const audioVolumesRef = doc(dbService, "audioVolumes", userId);
    const docSnapshot = await getDoc(audioVolumesRef);
    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      return data.volumes;
    } else {
      return [];
    }
  };

  const saveAudioVolumesToFirebase = async () => {
    if (!user) {
      return;
    }

    const currentVolumes = await loadAudioVolumes(user.displayname);

    if (JSON.stringify(currentVolumes) !== JSON.stringify(audioVolumes)) {
      await saveAudioVolumes(audioVolumes, user.displayname);
    }
  };

  const loadAudioVolumesFromFirebase = async () => {
    if (!user) {
      return;
    }

    const volumes = await loadAudioVolumes(user.displayname);
    if (volumes.length > 0) {
      setAudioVolumes((prevVolumes) => {
        const newVolumes = [...prevVolumes];
        volumes.forEach((volume, index) => {
          if (newVolumes[index] !== undefined) {
            newVolumes[index] = volume;
          }
        });
        return newVolumes;
      });
    }
  };

  useEffect(() => {
    const fetchVideoURL = async () => {
      const videoReference = ref(StorageService, "Video/Forest/forest1.mov");
      const url = await getDownloadURL(videoReference);
      setVideoURL(url);
      await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
      setIsVideoLoaded(true);
    };

    const fetchAudioURLs = async () => {
      const audioFolderReference = ref(StorageService, "Audio/Forest");
      const audioFiles = await listAll(audioFolderReference);

      const urls = await Promise.all(
        audioFiles.items.map(async (audioFile) => {
          const url = await getDownloadURL(audioFile);
          return url;
        })
      );

      setAudioURLs(urls);
      setIsAudioPlaying(new Array(urls.length).fill(false));
      setIsAudioMuted(new Array(urls.length).fill(false));
    };

    const fetchAudioVolumes = async () => {
      if (!user) {
        return;
      }

      const volumes = await loadAudioVolumes();
      if (volumes.length > 0) {
        setAudioVolumes(volumes);
      }
    };

    fetchVideoURL();
    fetchAudioURLs();
    fetchAudioVolumes();

    const videoEndTimeout = setTimeout(() => {
      handleVideoEnded();
    }, (4.5 + 2) * 1000); //4.5는 로딩 시간 2는 몇초 재생 할 건지 --> time으로 바꾸기

    return () => {
      clearTimeout(videoEndTimeout);
    };
  }, []);

  useEffect(() => {
    // 동영상 로딩이 끝나면 재생
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    // 로딩 상태 감지하여 Lottie 애니메이션 실행 제어
    if (isLoading) {
      const loadingAnimationTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 4.5 * 1000);

      return () => {
        clearTimeout(loadingAnimationTimeout);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    saveAudioVolumesToFirebase();
  }, [audioVolumes]);

  useEffect(() => {
    loadAudioVolumesFromFirebase();
  }, []);

  return (
    <Div>
      <PartDiv>
        {isLoading ? (
          <LoadingAnimationWrapper>
            <Lottie
              options={{
                animationData: animationData,
                loop: true,
                autoplay: true,
              }}
            />
          </LoadingAnimationWrapper>
        ) : (
          <div>
            {audioURLs.length > 0 && (
              <VideoContainer>
                {videoURL && (
                  <VideoElement
                    autoPlay
                    loop
                    src={videoURL}
                    muted
                    ref={videoRef}
                    onEnded={handleVideoEnded}
                  />
                )}
                <TopWrapper>
                  <Link to="/">
                    <Logo src={LogoImage} alt="Logo Image" />
                    <HamburgerMob setUser={setUser} />
                  </Link>
                </TopWrapper>
                <AudioArrowWrapper move={isMoved} ended={isEnded}>
                  <AllAudioWrapper>
                    <AllMuteText>전체 소리</AllMuteText>
                    <AllAudioMuteButton onClick={handleAllSoundToggleMute}>
                      <VideoMuteImage
                        src={isAudioAllMuted ? Mute : NotMute}
                        alt="Mute Image"
                      />
                    </AllAudioMuteButton>
                  </AllAudioWrapper>
                  {audioURLs.map((audioURL, index) => (
                    <div key={index}>
                      <audio
                        src={audioURL}
                        ref={(el) => (audioRefs.current[index] = el)}
                        //   autoPlay
                        //   muted={index === 0 ? isAudioMuted[index] : true}
                      />
                      <OneAudioWrapper>
                        <OneAudioWrapper1>
                          <AllMuteText>{muteTexts[index]}</AllMuteText>
                          <AllAudioMuteButton
                            onClick={() => handleAudioTogglePlay(index)}
                          >
                            <PlayPauseImage
                              src={isAudioPlaying[index] ? Pause : Play}
                              alt="Mute Image"
                            />
                          </AllAudioMuteButton>
                        </OneAudioWrapper1>
                        <OneAudioWrapper2>
                          <AllAudioMuteButton
                            onClick={() => handleAudioToggleMute(index)}
                          >
                            <AudioMuteImage
                              src={isAudioMuted[index] ? Mute : NotMute}
                              alt="Mute Image"
                            />
                          </AllAudioMuteButton>
                          <AudioSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.001"
                            value={audioVolumes[index] || 0}
                            onChange={(event) =>
                              handleAudioVolumeChange(event, index)
                            }
                          />
                        </OneAudioWrapper2>
                      </OneAudioWrapper>
                    </div>
                  ))}
                  <ArrowWrapper onClick={handleDivAClick}>
                    <Arrow src={arrowImageIndex === 1 ? Arrow1 : Arrow2} />
                  </ArrowWrapper>
                </AudioArrowWrapper>
              </VideoContainer>
            )}
          </div>
        )}
        {isModalOpen && (
          <Modal isOpen={isModalOpen} closeModal={closeModal}></Modal>
        )}
      </PartDiv>
    </Div>
  );
};

export default ForestVideoMob;
