import React, { useRef, useState, useEffect } from 'react';
import forest1 from '../../../Assets/Video/video44.mp4';
import test from '../../../Assets/Audio/test.mp3'
import { useAsyncError, useLocation } from "react-router-dom";

const ForstVideo = ({ time }) => {
    const videoRef = useRef(null);
    const [videoVolume, setVideoVolume] = useState(0);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioVolme, setAudioVolume] = useState(1);

    const handleVideoVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVideoVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const handleAudioVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setAudioVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    useEffect(() => {
        if (time > 0 && videoRef.current) { // videoRef.current가 존재하는지 확인합니다.
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setTimeout(() => {
                if (videoRef.current) { // setTimeout 실행 시에도 videoRef.current가 존재하는지 확인합니다.
                    videoRef.current.pause();
                }
            }, time * 1000);
        }
    }, [time]);


    return (
        <div>
            <h1>시간: {time}초</h1>
            <video autoPlay muted ref={videoRef}>
                <source src={forest1} type="video/mp4" />
            </video>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={videoVolume}
                onChange={handleVideoVolumeChange}
            />

            <audio src={test} type="audio/mpeg"></audio>
            {isPlaying ? (
                <button onClick={handlePause}>멈춤</button>
            ) : (
                <button onClick={handlePlay}>시작</button>
            )}
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={audioVolme}
                onChange={handleAudioVolumeChange}
            />
        </div>
    );
};

export default ForstVideo;
