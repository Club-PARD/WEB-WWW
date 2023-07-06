import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { setDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { authService, dbService, StorageService } from "../../../fbase";
import styled, { css } from "styled-components";
import Mute from "../../../Assets/img/mute2.png";
import NotMute from "../../../Assets/img/muteno2.png";
import LogoImage from "../../../Assets/img/Logowhite.png";
import Play from "../../../Assets/img/play3.png";
import Pause from "../../../Assets/img/pause5.png";
import Arrow1 from "../../../Assets/img/arrow1.png";
import Arrow2 from "../../../Assets/img/arrow2.png";
import Hamburgerhome from "../Web-HomePage/Web-Hamburgerhome";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/73711-loadingbar";
import Modal from "../Web-VideoPage/Web-Modal";

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
  display: flex;
  align-items: center;
  z-index: 2;
  margin-top: -15px;
  margin-left: 5px;
  top: 0;
  left: 0;
`;

const Logo = styled.img`
  position: absolute;
  width: 165px;
  height: 46px;
  margin-left: 40px;
  margin-top: 55px;
  z-index: 2;
`;

const AudioArrowWrapper = styled.div`
  position: absolute;
  top: 125px;
  left: 190px;
  transform: translateX(-180px);
  z-index: 2;
  width: 376px;
  height: 650px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid var(--main-white, #f2f2f2);
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(15px);
  transition: transform 0.3s ease;

  ${(props) =>
    props.move &&
    css`
      transform: translateX(-537px);
    `}

  ${(props) =>
    props.ended &&
    css`
      transform: translateX(-200%);
    `}
`;

const ArrowWrapper = styled.div`
  position: absolute;
  top: 283px;
  left: 100%;
  transform: translateX(-50%);
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

const ForestVideo = styled.video`
  width: 100%;
  height: 100%;
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

const VideoMuteImage = styled.img`
  width: 16px;
  height: 16px;
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

const OneAudioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OneAudioWrapper1 = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const OneAudioWrapper2 = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
  transform: translateX(-135px);
`;

const AudioSlider = styled.input`
  position: absolute;
  margin-top: 20px;
  margin-left: -170px;
  z-index: 1;
  width: 210px;
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

const LoadingAnimationWrapper = styled.div`
  scale: 50%;
  height: 100vh;
`;
const ForestVideoComponent = ({ user, setUser, time }) => {
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
  const [isVideoMuted, setIsVIdeoMuted] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRefs = useRef([]);
  const videoRef = useRef("");

  const muteTexts = [
    "배경소리",
    "바람소리",
    "대화소리",
    "벌레소리",
    "파도 치는 소리",
    "빗소리",
  ];

  const [valuel, setValuel] = useState();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.currentUser;
        const isUserLoggedIn = user !== null;
        const volumesKey = "audioVolumes";

        if (isUserLoggedIn) {
          const docRef = doc(
            dbService,
            "audioVolumes",
            `${user.displayName}_fire`
          );
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const volumes = docSnap.data().volumes;
            console.log("Fetched volumes:", volumes);

            if (volumes && volumes.length > 0) {
              setAudioVolumes(volumes);
            } else {
              const basicVolumes = Array(audioURLs.length).fill(0.5);
              await updateDoc(docRef, { volumes: basicVolumes });
              setAudioVolumes(basicVolumes);
            }
          } else {
            console.log("No such document!");
            const basicVolumes = Array(audioURLs.length).fill(0.5);
            await setDoc(docRef, { volumes: basicVolumes });
            setAudioVolumes(basicVolumes);
          }
        } else {
          const storedVolumes = localStorage.getItem(volumesKey);
          if (storedVolumes) {
            setAudioVolumes(JSON.parse(storedVolumes));
          } else {
            const basicVolumes = Array(audioURLs.length).fill(0.5);
            setAudioVolumes(basicVolumes);
            localStorage.setItem(volumesKey, JSON.stringify(basicVolumes));
          }
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authService.currentUser, audioURLs]);

  async function handleOnSubmitWithdoc(updatedVolumes) {
    console.log("create firstStep에 저장 시작");
    const user = authService.currentUser;

    if (!user) {
      console.log("User is not logged in");
      return;
    }

    const docRef = doc(dbService, "audioVolumes", `${user.displayName}_fire`);

    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { volumes: updatedVolumes });
        console.log("Update volumes successfully");
      } else {
        const initialVolumes = Array.from(
          { length: audioURLs.length },
          () => 0.4
        );
        await setDoc(docRef, { volumes: initialVolumes });
        console.log("Create volumes successfully");
      }
      // setAudioVolumes(updatedVolumes); // 볼륨 상태 업데이트
    } catch (error) {
      console.log("Error creating/updating volumes:", error);
    }
  }

  function handleAudioVolumeChange(event, index) {
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

    handleOnSubmitWithdoc([
      ...audioVolumes.slice(0, index),
      newVolume,
      ...audioVolumes.slice(index + 1),
    ]);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVideoEnded = () => {
    openModal();
    setArrowImageIndex(1);
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

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

  useEffect(() => {
    const fetchVideoURL = async () => {
      const videoReference = ref(StorageService, "Video/Fire/fire1.mov");
      const url = await getDownloadURL(videoReference);
      setVideoURL(url);
      await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
      setIsVideoLoaded(true);
    };

    const fetchAudioURLs = async () => {
      const audioFolderReference = ref(StorageService, "Audio/Fire");
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

    fetchVideoURL();
    fetchAudioURLs();

    const playtime = sessionStorage.getItem("TIME");

    const videoEndTimeout = setTimeout(() => {
      handleVideoEnded();
    }, 4.5 * 1000 + Number(playtime) * 1000 * 60); //4.5는 로딩 시간 2는 몇초 재생 할 건지 --> time으로 바꾸기

    return () => {
      clearTimeout(videoEndTimeout);
    };
  }, []);

  useEffect(() => {
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play();
    }
  }, [isVideoLoaded]);

  useEffect(() => {
    if (isLoading) {
      const loadingAnimationTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 4.5 * 1000);

      return () => {
        clearTimeout(loadingAnimationTimeout);
      };
    }
  }, [isLoading]);

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
                  </Link>
                  <Hamburgerhome setUser={setUser} />
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
                        loop
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
                            step="0.01"
                            value={audioVolumes[index]}
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

export default ForestVideoComponent;
