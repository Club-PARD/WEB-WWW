import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ref,
  listAll,
  uploadBytes,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import {
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteField,
  deleteDoc,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { authService, dbService, StorageService } from "../../../fbase";
import styled, { css } from "styled-components";
import Mute from "../../../Assets/img/mute2.png";
import NotMute from "../../../Assets/img/muteno2.png";
import LogoImage from "../../../Assets/img/Logowhite.png";
import Play from "../../../Assets/img/Play.png";
import Pause from "../../../Assets/img/Pause.png";
import Arrow1 from "../../../Assets/img/arrow1.png";
import Arrow2 from "../../../Assets/img/arrow2.png";
import Hamburgerhome from "../Web-HomePage/Web-Hamburgerhome";
import Lottie from "react-lottie";
import animationData from "../../../Assets/img/118176-day-and-night-transition-scene";
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
  top: 95px;
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
  top: 220px;
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

const ForestVideoComponent = ({ user, setUser }) => {
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

  const [valuel, setValuel] = useState();
  const [firstStep, setFirstStep] = useState("");
  const [getImformation, setGetImformation] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState("");
  const [init, setInit] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const user = authService.currentUser;
    if (user) {
      setDisplayName(user.displayName);
    }
  }, []);

  const onChange = (event) => {
    //input 값이 입력 될 때 onchange를 통해 자동적으로 setState해준다! = 동기화 시켜주기
    const {
      target: { value },
    } = event;
    console.log(value);
    setValuel(value);
  };

  /* ################################# Create data ################################# */
  function handleOnSubmitid() {
    // firebase create 함수 원하는 collection에 doc id(램덤값)을 넣어준다.
    console.log("create 시작");
    const docRef = addDoc(collection(dbService, "audioVolumes", displayName), {
      // create라는 collection 안에 넣겠다는 뜻
      create: valuel,
      update: valuel,
      delete: valuel,
    });
    if (docRef) {
      setValuel();
      console.log("create 성공");
    }
  }

  function handleOnSubmitWithdoc() {
    // firebase create 함수 원하는 collection 안에 원하는 doc을 입력할 떄 쓴다.
    console.log("create firstStep에 저장 시작");
    const docRef = setDoc(doc(dbService, "audioVolumes", displayName), {
      // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
      create: valuel,
      update: valuel,
      delete: valuel,
    });
    if (docRef) {
      setValuel();
      console.log("create firstStep에 저장 성공");
    }
  }

  /* ################################# Read data ################################# */
  async function fetchData() {
    // firebase Read : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "audioVolumes", displayName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFirstStep(docSnap.data().create);
      console.log(firstStep);
    } else {
      console.log("No such document!");
      setFirstStep("정보 없음");
    }
  }

  async function fetchAllData() {
    // firebase Read : 함수 원하는 collection 안에 모든 doc을 읽어올 때 사용한다.
    const data = await getDocs(collection(dbService, displayName));
    const newData = data.docs.map((doc) => ({ ...doc.data() }));
    setGetImformation(newData);
    console.log(newData);
    console.log("get create doc!");
  }

  useEffect(() => {
    // 화면 켜지면 한 번만 읽어오게~
    fetchData();
    fetchAllData();
  }, []);

  /* ################################# Update data ################################# */
  function handleOnUpdate() {
    // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 특정 field를 업데이트해주고 싶을 때 사용한다
    console.log("update 시작");
    const docRef = doc(dbService, "audioVolumes", displayName);
    updateDoc(docRef, { update: valuel});
    if (docRef) {
      setValuel();
      console.log("update 성공");
    }
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

  // const saveAudioVolumes = async (audioVolumes, userId) => {
  //   if (!user) {
  //     return;
  //   }

  //   const audioVolumesRef = doc(dbService, "audioVolumes", userId);
  //   await setDoc(audioVolumesRef, { volumes: audioVolumes });
  // };

  // const loadAudioVolumes = async (userId) => {
  //   if (!user) {
  //     return [];
  //   }

  //   const audioVolumesRef = doc(dbService, "audioVolumes", userId);
  //   const docSnapshot = await getDoc(audioVolumesRef);
  //   if (docSnapshot.exists()) {
  //     const data = docSnapshot.data();
  //     return data.volumes || [];
  //   } else {
  //     return [];
  //   }
  // };

  // const saveAudioVolumesToFirebase = async () => {
  //   if (!user) {
  //     return;
  //   }

  //   const currentVolumes = await loadAudioVolumes(user.uid);

  //   if (JSON.stringify(currentVolumes) !== JSON.stringify(audioVolumes)) {
  //     await saveAudioVolumes(audioVolumes, user.uid);
  //   }
  // };

  // const loadAudioVolumesFromFirebase = async () => {
  //   if (!user) {
  //     return;
  //   }

  //   const volumes = await loadAudioVolumes(user.uid);
  //   if (volumes.length > 0) {
  //     setAudioVolumes(volumes);
  //   }
  // };

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

    // const fetchAudioVolumes = async () => {
    //   if (!user) {
    //     const basicVolumes = Array(audioURLs.length).fill(0.5);
    //     setAudioVolumes(basicVolumes);
    //     return;
    //   }
    //   const volumes = await loadAudioVolumes();
    //   if (volumes.length > 0) {
    //     setAudioVolumes(volumes);
    //   }
    // };

    fetchVideoURL();
    fetchAudioURLs();
    // fetchAudioVolumes();

    const videoEndTimeout = setTimeout(() => {
      handleVideoEnded();
    }, (4.5 + 10000000) * 1000); //4.5는 로딩 시간 2는 몇초 재생 할 건지 --> time으로 바꾸기

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

  // useEffect(() => {
  //   saveAudioVolumesToFirebase();
  // }, [audioVolumes]);

  // useEffect(() => {
  //   loadAudioVolumesFromFirebase();
  // }, []);

  return (
    <Div>
      <header style={{ display: "flex" }}>
        <h1>React</h1>
        <h2>firebase</h2>
        <h3>CRUD</h3>
      </header>
      <input type="text" value={valuel} required onChange={onChange} />
      <button onClick={handleOnSubmitWithdoc}>저장하기</button>
      <button onClick={handleOnUpdate}>업데이트하기</button>
      {/* <button onClick={handleOnDelte}>삭제하기</button> */}
      <div>
        <h1>{valuel}</h1>
      </div>
      {/* <PartDiv>
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
      </PartDiv> */}
    </Div>
  );
};

export default ForestVideoComponent;
