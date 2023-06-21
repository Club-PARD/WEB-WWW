import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import forest1 from '../../../Assets/Video/video44.mp4';
import test from '../../../Assets/Audio/test.mp3';

const VideoWrapper = styled.div`
  position: relative;
`;

const VolumeSlider = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const AudioSlider = styled.input`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
`;

const ForestVideo = ({ time }) => {
    const [videoVolume, setVideoVolume] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioVolume, setAudioVolume] = useState(1);
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
        <VideoWrapper>
            <video autoPlay muted ref={videoRef}>
                <source src={forest1} type="video/mp4" />
            </video>
            <VolumeSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={videoVolume}
                onChange={handleVideoVolumeChange}
            />

            <audio ref={audioRef}>
                <source src={test} type="audio/mpeg" />
            </audio>
            {isPlaying ? (
                <button onClick={handlePause}>멈춤</button>
            ) : (
                <button onClick={handlePlay}>시작</button>
            )}
            <AudioSlider
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioVolume}
                onChange={handleAudioVolumeChange}
            />
        </VideoWrapper>
    );
};

export default ForestVideo;
