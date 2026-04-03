import React, { useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const WhatWedo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="bg-[#f7f7fa] py-16 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2F327D] mb-6">
            What is <span className="text-[#6C5CE7]">PROMPTAi</span> Do?
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-4xl leading-relaxed">
            TOTC is a platform that allows educators to create online classes
            whereby they can store the course materials online; manage
            assignments, quizzes and exams; monitor due dates; grade results and
            provide students with feedback all in one place.
          </p>
        </div>

        <div
          className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl mb-20 bg-black"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            className={`w-full h-full object-cover ${isPlaying ? "opacity-100" : "opacity-0"}`}
            onClick={toggleVideo}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
            muted
            autoPlay
          >
            <source
              src="https://videos.pexels.com/video-files/12363703/12363703-uhd_2560_1440_24fps.mp4"
              type="video/mp4"
            />
          </video>

          {!isPlaying && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/your-video-placeholder.png)" }}
            />
          )}

          <div
            className={`absolute inset-0 flex items-center justify-center ${!isPlaying && "bg-black/30"} hover:cursor-pointer`}
            onClick={toggleVideo}
          >
            {!isPlaying && (
              <button
                // onClick={toggleVideo}
                className="w-20 h-20 hover:cursor-pointer bg-white/90 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform pointer-events-auto"
              >
                <Play
                  className="text-[#FF4D4D] fill-[#FF4D4D] ml-1"
                  size={32}
                />
              </button>
            )}
          </div>

          {(showControls || isPlaying) && (
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/70 to-transparent p-4 flex items-center gap-4">
              <button
                onClick={toggleVideo}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="text-white fill-white" size={20} />
                ) : (
                  <Play className="text-white fill-white ml-0.5" size={20} />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="text-white" size={20} />
                ) : (
                  <Volume2 className="text-white" size={20} />
                )}
              </button>
              {/* <span className="text-white text-sm">
                {isPlaying ? "Playing..." : "Paused"}
              </span> */}
            </div>
          )}
        </div>

        <div className="relative w-full">
          <div className="flex flex-col items-center justify-center w-full max-w-5xl">
            <img src="/ilastration.png" alt="ilastration" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWedo;
