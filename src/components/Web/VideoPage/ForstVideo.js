import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import forest1 from '../../../Assets/Video/ForestVideo/video44.mp4';
import test from '../../../Assets/Audio/test.mp3';

const VideoContinaer = styled.div`
  position: relative;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
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
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`
const AudioButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  margin-top: 20px;
`;

const AudioSlider = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  margin-top: 23px;
  margin-left: 50px;
`;

const ForestVideo = ({ time }) => {
    const [videoVolume, setVideoVolume] = useState(1);
    const [audioVolume, setAudioVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null);

    const handleVideoVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVideoVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    const handleAudioVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setAudioVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    const handlePlay = () => {
        audioRef.current.play();
        videoRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioRef.current.pause();
        videoRef.current.pause();
        setIsPlaying(false);
    };

    const handleToggleMute = () => {
        setIsMuted(!isMuted);
        videoRef.current.muted = !isMuted;
    };

    useEffect(() => {
        if (time > 0 && videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                }
                if (audioRef.current) {
                    audioRef.current.pause();
                }
            }, time * 1000);
        }
    }, [time]);

    return (
        <VideoContinaer>
            <video autoPlay muted={isMuted} ref={videoRef}>
                <source src={forest1} type="video/mp4" />
            </video>
            <VideoWrapper>
                <MuteButton onClick={handleToggleMute}>{isMuted ? '음소거 해제' : '음소거'}</MuteButton>
                <VolumeSlider
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={videoVolume}
                    onChange={handleVideoVolumeChange}
                />
            </VideoWrapper>

            <audio ref={audioRef}>
                <source src={test} type="audio/mpeg" />
            </audio>
            <AudioWrapper>
                {isPlaying ? (
                    <AudioButton onClick={handlePause}>멈춤</AudioButton>
                ) : (
                    <AudioButton onClick={handlePlay}>시작</AudioButton>
                )}
                <AudioSlider
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={audioVolume}
                    onChange={handleAudioVolumeChange}
                />
            </AudioWrapper>
        </VideoContinaer>
    );
};

export default ForestVideo;
