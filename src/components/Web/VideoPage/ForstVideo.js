import React, { useRef, useState, useEffect } from 'react';

const ForstVideo = ({ url }) => {
    const videoRef = useRef(null);
    const [volume, setVolume] = useState(0);
    const [time, setTime] = useState(0);

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
            {/* <video autoPlay muted loop>
                <source src={require("../../../assets/Video/video44.mp4")} type="video/mp4" />
            </video> */}
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
