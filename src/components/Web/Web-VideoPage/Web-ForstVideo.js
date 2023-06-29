import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { StorageService } from "../../../fbase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled, { css } from 'styled-components';
import Mute from "../../../Assets/img/mute2.png";
import NotMute from "../../../Assets/img/muteno2.png";
import LogoImage from "../../../Assets/img/Insta.png";
import Play from "../../../Assets/img/Play.png";
import Pause from "../../../Assets/img/Pause.png";
import Arrow1 from "../../../Assets/img/arrow1.png";
import Arrow2 from "../../../Assets/img/arrow2.png";
import Hamburgerhome from "../Web-HomePage/Web-Hamburgerhome";
import Lottie from 'react-lottie';
import animationData from '../../../Assets/img/72694-brain-bulb-charging.json';

const VideoContainer = styled.div`
    position: relative;
    width: 100%;
`;

const VideoWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const TopWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 2;
    margin-top: -15px;
    margin-left: 5px;
`;

const Logo = styled.img`
    position: absolute;
    width: 50px;
    height: 50px;
    margin-left: 40px;
    margin-top: 55px;
    z-index: 2;
`;

const VideoMuteButton = styled.div`
    position: absolute;
    display: flex;
    width: 32px;
    height: 32px;
    margin-top: 160px;
    margin-left: 1300px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    z-index: 2;
`;

const AudioArrowWrapper = styled.div`
    position: absolute;
    top: 140px;
    left: 190px;
    transform: translateX(-180px);
    z-index: 2;
    width: 376px;
    height: 537px;
    flex-shrink: 0;
    border-radius: 20px;
    border: 1px solid var(--main-white, #F2F2F2);
    background: rgba(255, 255, 255, 0.01);
    backdrop-filter: blur(15px); 
    transition: transform 0.3s ease;  
    
    ${props =>
        props.move &&
        css`
      transform: translateX(-537px);
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
    background: var(--main-white, #F2F2F2);
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
`

const AllMuteText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--main-white, #F2F2F2);
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

const AllAudioMuteImage = styled.img`
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
`;

const AudioSlider = styled.input`
    position: absolute;
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

const ProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ progress }) => `${progress}%`};
  height: 5px;
  background-color: #ccc;
`;

const ForestVideoComponent = ({ setUser }) => {
    const [videoURL, setVideoURL] = useState("");
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [audioURLs, setAudioURLs] = useState([]);
    const [isAudioMuted, setIsAudioMuted] = useState([]);
    const [isAudioAllMuted, setIsAudioAllMuted] = useState(true);
    const [audioVolumes, setAudioVolumes] = useState([]);
    const [isAudioPlaying, setIsAudioPlaying] = useState([]);
    const [arrowImageIndex, setArrowImageIndex] = useState(1);
    const [audioArrowVisible, setAudioArrowVisible] = useState("");
    const [isMoved, setIsMoved] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const audioRefs = useRef([]);
    const videoRef = useRef("");
    const muteTexts = ["빗소리", "새소리"];

    const handleProgress = () => {
        const video = videoRef.current;
        const duration = video.duration;
        const currentTime = video.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    };

    const handleDivAClick = () => {
        setIsMoved(!isMoved);
        setArrowImageIndex(prevIndex => (prevIndex === 1 ? 2 : 1));
        setAudioArrowVisible(false);
    };
    const handleAudioVolumeChange = (event, index) => {
        const newVolume = parseFloat(event.target.value);
        setAudioVolumes((prevVolumes) => {
            const newVolumes = [...prevVolumes];
            newVolumes[index] = newVolume;
            return newVolumes;
        });
        if (audioRefs.current[index]) {
            audioRefs.current[index].volume = newVolume;
        }
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

    const handleVideoToggleMute = () => {
        setIsVideoMuted((prevIsMuted) => !prevIsMuted);

        if (videoRef.current) {
            videoRef.current.muted = !isVideoMuted;
        }
    };

    const handleAllAudioToggleMute = () => {
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

    const saveAudioVolumes = async (audioVolumes) => {
        const audioVolumesRef = doc(dbService, "audioVolumes", "user1");
        await setDoc(audioVolumesRef, { volumes: audioVolumes });
    };

    const loadAudioVolumes = async () => {
        const audioVolumesRef = doc(dbService, "audioVolumes", "user1");
        const docSnapshot = await getDoc(audioVolumesRef);
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            return data.volumes;
        } else {
            return [];
        }
    };

    const saveAudioVolumesToFirebase = async () => {
        const currentVolumes = await loadAudioVolumes();

        if (JSON.stringify(currentVolumes) !== JSON.stringify(audioVolumes)) {
            await saveAudioVolumes(audioVolumes);
        }
    };

    const loadAudioVolumesFromFirebase = async () => {
        const volumes = await loadAudioVolumes();
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
            const videoReference = ref(StorageService, "Video/Forest/forest1.mp4");
            const url = await getDownloadURL(videoReference);
            setVideoURL(url);
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
            const volumes = await loadAudioVolumes();
            if (volumes.length > 0) {
                setAudioVolumes(volumes);
            }
        };

        fetchVideoURL();
        fetchAudioURLs();
        fetchAudioVolumes();
    }, []);

    useEffect(() => {
        const videoLoadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearTimeout(videoLoadingTimeout);
        };
    }, []);

    useEffect(() => {
        saveAudioVolumesToFirebase();
    }, [audioVolumes]);

    useEffect(() => {
        loadAudioVolumesFromFirebase();
    }, []);

    return (
        <div>
            {audioURLs.length > 0 && (
                <VideoContainer>
                    <TopWrapper>
                        <Link to="/">
                            <Logo src={LogoImage} alt="Logo Image" />
                        </Link>
                        <VideoMuteButton onClick={handleVideoToggleMute}>
                            <VideoMuteImage src={isVideoMuted ? Mute : NotMute} alt="Mute Image" />
                            <Hamburgerhome setUser={setUser} />
                        </VideoMuteButton>
                    </TopWrapper>
                    <div> {videoURL && (
                        <ForestVideo autoPlay src={videoURL} muted={isVideoMuted} ref={videoRef} onTimeUpdate={handleProgress}
                        />
                    )}</div>
                    <VideoWrapper>
                        <ProgressBar progress={progress} />
                    </VideoWrapper>
                    <AudioArrowWrapper move={isMoved}>
                        <AllAudioWrapper>
                            <AllMuteText>전체소리 음소거</AllMuteText>
                            <AllAudioMuteButton onClick={handleAllAudioToggleMute}>
                                <AllAudioMuteImage src={isAudioAllMuted ? NotMute : Mute} alt="Mute Image" />
                            </AllAudioMuteButton>
                        </AllAudioWrapper>
                        {audioURLs.map((audioURL, index) => (
                            <div key={index}>
                                <audio src={audioURL} ref={(el) => (audioRefs.current[index] = el)} />
                                <OneAudioWrapper>
                                    <OneAudioWrapper1>
                                        <AllMuteText>{muteTexts[index]}</AllMuteText>
                                        <AllAudioMuteButton onClick={() => handleAudioTogglePlay(index)}>
                                            <PlayPauseImage src={isAudioPlaying[index] ? Pause : Play} alt="Mute Image" />
                                        </AllAudioMuteButton>
                                    </OneAudioWrapper1>
                                    <OneAudioWrapper2>
                                        <AllAudioMuteButton onClick={() => handleAudioToggleMute(index)}>
                                            <AudioMuteImage
                                                src={isAudioMuted[index] ? Mute : NotMute}
                                                alt="Mute Image"
                                            />
                                            <AudioSlider type="range" min="0" max="1" step="0.1"
                                                value={audioVolumes[index] || 0} onChange={(event) => handleAudioVolumeChange(event, index)}
                                            />
                                        </AllAudioMuteButton>
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
    );
};

export default ForestVideoComponent;
