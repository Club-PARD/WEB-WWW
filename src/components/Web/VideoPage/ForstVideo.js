import React, { useRef, useState, useEffect } from 'react';
import forest1 from '../../../Assets/Video/video44.mp4';

const ForstVideo = ({ time }) => {
    const videoRef = useRef(null);
    const [volume, setVolume] = useState(0);

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
    };

    useEffect(() => {
        if (time > 0) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
            setTimeout(() => {
                videoRef.current.pause();
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
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
};

export default ForstVideo;
