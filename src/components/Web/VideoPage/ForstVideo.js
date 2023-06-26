import React, { useState, useEffect, useRef } from "react";
import { StorageService } from "../../../fbase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { dbService } from "../../../fbase";
import styled from "styled-components";

const PartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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

const AudioWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 500px;
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
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [audioVolumes, setAudioVolumes] = useState([]);
    const [isAudioPlaying, setIsAudioPlaying] = useState([]);
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
        setIsVideoMuted(!isVideoMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isVideoMuted;
        }
    };

    const handleAudioToggleMute = () => {
        setIsAudioMuted(!isAudioMuted);
        audioRefs.current.forEach((audio) => {
            audio.muted = !isAudioMuted;
        });
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
                                <audio src={audioURL} ref={(el) => (audioRefs.current[index] = el)} />
                                {isAudioPlaying[index] ? (
                                    <AudioButton onClick={() => handleAudioPause(index)}>멈춤</AudioButton>
                                ) : (
                                    <AudioButton onClick={() => handleAudioPlay(index)}>시작</AudioButton>
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
            )}
        </PartDiv>
    );
};

export default ForestVideoComponent;
