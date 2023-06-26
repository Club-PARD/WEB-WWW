import React, { useState, useEffect, useRef } from "react";
import { StorageService } from "../../../fbase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ForestVideo = styled.video`
  width: 100%;
  height: 100%;
`;

const MuteButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const VolumeSlider = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  margin-left: 60px;
`;

const AudioWrapper = styled.div`
  position: absolute;
  top: 50px;
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

const ForestVideoComponent = () => {
    const [videoURL, setVideoURL] = useState("");
    const [isVideoMuted, setIsVideoMuted] = useState(true);
    const [audioURLs, setAudioURLs] = useState([]);
    const [isAudioMuted, setIsAudioMuted] = useState(true);
    const [audioVolumes, setAudioVolumes] = useState([]);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const videoRef = useRef(null);
    const audioRefs = useRef([]);

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

    const handlePlay = () => {
        if (audioRefs.current) {
            audioRefs.current.forEach((audio) => audio.play());
        }
        if (videoRef.current) {
            videoRef.current.play();
        }
        setIsAudioPlaying(true);
    };

    const handlePause = () => {
        if (audioRefs.current) {
            audioRefs.current.forEach((audio) => audio.pause());
        }
        if (videoRef.current) {
            videoRef.current.pause();
        }
        setIsAudioPlaying(false);
    };

    const handleVideoToggleMute = () => {
        setIsVideoMuted(!isVideoMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isVideoMuted;
        }
    };

    const handleAudioToggleMute = () => {
        setIsAudioMuted(!isAudioMuted);
        if (audioRefs.current) {
            audioRefs.current.muted = !isAudioMuted;
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
        await saveAudioVolumes(audioVolumes);
    };

    const loadAudioVolumesFromFirebase = async () => {
        const volumes = await loadAudioVolumes();
        if (volumes.length > 0) {
            setAudioVolumes(volumes);
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
        };

        const initializeAudioVolumes = async () => {
            const volumes = await loadAudioVolumes();
            if (volumes.length > 0) {
                setAudioVolumes(volumes);
            } else {
                setAudioVolumes(new Array(audioURLs.length).fill(1));
            }
        };

        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                }
                if (audioRefs.current) {
                    audioRefs.current.forEach((audio) => audio.pause());
                }
            }, 5 * 1000);
        }

        fetchVideoURL();
        fetchAudioURLs();
        initializeAudioVolumes();
    }, []);

    useEffect(() => {
        saveAudioVolumesToFirebase();
    }, [audioVolumes]);

    return (
        <VideoContainer>
            {videoURL && (
                <ForestVideo autoPlay src={videoURL} muted={isVideoMuted} ref={videoRef} />
            )}
            <VideoWrapper>
                <MuteButton onClick={handleVideoToggleMute}>
                    {isVideoMuted ? "음소거 해제" : "음소거"}
                </MuteButton>
            </VideoWrapper>
            <AudioWrapper>
                {audioURLs.map((audioURL, index) => (
                    <div key={audioURL}>
                        <audio src={audioURL} autoPlay ref={(el) => (audioRefs.current[index] = el)} />
                        {isAudioPlaying ? (
                            <AudioButton onClick={handlePause}>멈춤</AudioButton>
                        ) : (
                            <AudioButton onClick={handlePlay}>시작</AudioButton>
                        )}
                        <AudioSlider
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={audioVolumes[index]}
                            onChange={(e) => handleAudioVolumeChange(e, index)}
                        />
                    </div>
                ))}
            </AudioWrapper>
        </VideoContainer>
    );
};

export default ForestVideoComponent;
