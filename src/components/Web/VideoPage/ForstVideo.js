import React, { useState, useEffect, useRef } from "react";
import { StorageService } from "../../../fbase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled from "styled-components";
import Mute from "../../../Assets/img/mute2.png";
import NotMute from "../../../Assets/img/muteno2.png";
import LogoImage from "../../../Assets/img/Insta.png";

const PartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%
`;

const TopWrapper = styled.div`
`
const Logo = styled.img`
    position: absolute;
    width: 100px;
    height: 100px;
    margin-left: 50px;
    margin-top: 50px;
  `

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForestVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const VideoMuteButton = styled.button`
  position: relative;
  display: flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const AudioWrapper = styled.div`
  position: absolute;
  width: 376px;
  height: 537px;
  margin-left: 20px;
  margin-top: 156px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 3px solid var(--main-white, #F2F2F2);
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(15px);  top: 50px;
  margin-left: 10px;
  z-index: 1;
`;

const AudioButton = styled.button`
  position: relative;
  margin-top: 10px;
  margin-left: 10px;
`;

const AudioSlider = styled.input`
  position: absolute;
  margin-top: 15px;
  margin-left: 30px;
  z-index: 1;
  width: 150px;
`;

const AudioMuteButton = styled.button`
  /* position: absolute; */
  margin-top: 60px;
  left: 500px;
  z-index: 1;
`;

const AllAudioMuteButton = styled.button`
  position: relative;
  margin-top: 10px;
  margin-left: 30px;
  z-index: 1;
`;

const ForestVideoComponent = () => {
    const [videoURL, setVideoURL] = useState("");
    const [isVideoMuted, setIsVideoMuted] = useState(false);
    const [audioURLs, setAudioURLs] = useState([]);
    const [isAudioMuted, setIsAudioMuted] = useState([]);
    const [isAudioAllMuted, setIsAudioAllMuted] = useState(true);
    const [audioVolumes, setAudioVolumes] = useState([]);
    const [isAudioPlaying, setIsAudioPlaying] = useState([]);
    const [colorTemperature, setColorTemperature] = useState(0);
    const videoRef = useRef(null);
    const audioRefs = useRef([]);

    const handleColorTemperature = (e) => {
        const value = e.target.value;
        if (videoRef.current) {
            videoRef.current.style.filter = `brightness(${value})`;
        }
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

    const handleAudioPlay = (index) => {
        setIsAudioPlaying((prevIsPlaying) => {
            const newIsPlaying = [...prevIsPlaying];
            newIsPlaying[index] = true;
            return newIsPlaying;
        });
        audioRefs.current[index].play();
    };

    const handleAudioPause = (index) => {
        setIsAudioPlaying((prevIsPlaying) => {
            const newIsPlaying = [...prevIsPlaying];
            newIsPlaying[index] = false;
            return newIsPlaying;
        });
        audioRefs.current[index].pause();
    };

    const handleVideoToggleMute = () => {
        setIsVideoMuted((prevIsMuted) => !prevIsMuted);
        audioRefs.current.forEach((audio) => {
            audio.muted = !isVideoMuted;
        });
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
        saveAudioVolumesToFirebase();
    }, [audioVolumes]);

    useEffect(() => {
        loadAudioVolumesFromFirebase();
    }, []);

    return (
        <PartDiv>
            {audioURLs.length > 0 && (
                <VideoContainer>
                    <Logo src={LogoImage} alt="Logo Image"></Logo>
                    {videoURL && (
                        <ForestVideo autoPlay src={videoURL} muted={isVideoMuted} ref={videoRef} />
                    )}
                    <VideoWrapper>
                        <VideoMuteButton onClick={handleVideoToggleMute}>
                            {isVideoMuted ? "비디오 음소거 해제" : "비디오 동영상 음소거"}
                        </VideoMuteButton>
                    </VideoWrapper>
                    <AudioWrapper>
                        <AllAudioMuteButton onClick={handleAllAudioToggleMute}>
                            {isAudioAllMuted ? "전체소리 음소거 해제" : "전체소리 음소거"}
                        </AllAudioMuteButton>
                        {audioURLs.map((audioURL, index) => (
                            <div key={index}>
                                <audio src={audioURL} ref={(el) => (audioRefs.current[index] = el)} />
                                <AudioMuteButton onClick={() => handleAudioToggleMute(index)}>
                                    {isAudioMuted[index] ? "음소거 해제" : "음소거"}
                                </AudioMuteButton>
                                {isAudioPlaying[index] ? (
                                    <AudioButton onClick={() => handleAudioPause(index)}>일시정지</AudioButton>
                                ) : (
                                    <AudioButton onClick={() => handleAudioPlay(index)}>재생</AudioButton>
                                )}
                                <AudioSlider
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={audioVolumes[index] || 0}
                                    onChange={(event) => handleAudioVolumeChange(event, index)}
                                />
                            </div>
                        ))}
                    </AudioWrapper>
                </VideoContainer>
            )}
        </PartDiv>
    );
};

export default ForestVideoComponent;
