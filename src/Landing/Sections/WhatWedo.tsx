import React, { useRef, useState, useEffect } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

const HOTSPOTS = [
  {
    id: "audit",
    img: "/agent.png",
    label: "Consult",
    description:
      "We will assess your AI readiness and make recommendations on how AI & Automation can improve your function adding real value to your business.",
  },
  {
    id: "train",
    img: "/train.png",
    label: "Train",
    description:
      "Your team needs the skills to use AI effectively and to train others in your workplace. We will tailor a training plan to suit your needs.",
  },
  {
    id: "agent",
    label: "Agent",
    img: "/audit.png",
    description:
      "A cost-effective TA or HR AI Assistant who learns from you, to be like you, and helps take away all the boring admin and repetition. Freeing you up to work on the human-led tasks.",
  },
];

const WhatWedo: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the whole hotspot area
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isVideoStarted, setIsVideoStarted] = useState(false);

  // Tooltip State
  const [activeData, setActiveData] = useState<(typeof HOTSPOTS)[0] | null>(
    null,
  );
  const [tooltipPos, setTooltipPos] = useState({
    top: 0,
    left: 0,
    flipVertical: false,
  });

  // --- Click Outside Logic ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveData(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageClick = (e: React.MouseEvent, hs: (typeof HOTSPOTS)[0]) => {
    e.stopPropagation(); // Prevent immediate closing
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = containerRef.current?.getBoundingClientRect();

    if (parentRect) {
      const left = rect.left - parentRect.left + rect.width / 2;
      const top = rect.top - parentRect.top;

      // Toggle logic: click same image to close, or open new one
      if (activeData?.id === hs.id) {
        setActiveData(null);
      } else {
        setActiveData(hs);
        setTooltipPos({
          top,
          left,
          flipVertical: top < 250, // Flips if too close to top of container
        });
      }
    }
  };

  const toggleVideo = () => {
    if (!iframeRef.current?.contentWindow) return;
    const action = isPlaying ? "pauseVideo" : "playVideo";
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: action, args: [] }),
      "*"
    );

    // Make sure mute state matches when starting
    if (!isPlaying && isMuted) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "mute", args: [] }),
        "*"
      );
    }

    setIsPlaying(!isPlaying);
    setIsVideoStarted(true);
  };

  const toggleMute = () => {
    if (!iframeRef.current?.contentWindow) return;
    const action = isMuted ? "unMute" : "mute";
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: action, args: [] }),
      "*"
    );
    setIsMuted(!isMuted);
  };
  return (
    <section className="bg-[#f7f7fa] py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center pt-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2F327D] mb-6">
            What can <span className="text-[#6C5CE7]">PeopleOrbitAI</span> Do
            For You??
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-4xl leading-relaxed">
            PeopleOrbitAI helps you turn AI into outcomes...
          </p>
        </div>

        <div
          className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden shadow-2xl mb-20 bg-black"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <iframe
            ref={iframeRef}
            className="w-full h-full object-cover pointer-events-none"
            src="https://www.youtube.com/embed/_cgnePbqAiQ?enablejsapi=1&controls=0&rel=0&showinfo=0&modestbranding=1"
            title="PeopleOrbitAi Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* Overlay to catch clicks and toggle video play/pause */}
          <div className="absolute inset-0 cursor-pointer" onClick={toggleVideo} />

          {(!isVideoStarted) && (
            <img
              src="/your-video-placeholder.png"
              alt=""
              className=" absolute inset-0 w-full h-full object-cover pointer-events-none"
            />
          )}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
              onClick={toggleVideo}
            >
              <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform hover:cursor-pointer">
                <Play
                  className="text-[#FF4D4D] fill-[#FF4D4D] ml-1"
                  size={32}
                />
              </button>
            </div>
          )}

          {(showControls || isPlaying) && (
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/20 to-transparent p-4 flex gap-4 pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVideo();
                }}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:cursor-pointer pointer-events-auto"
              >
                {isPlaying ? (
                  <Pause className="text-white fill-white" size={20} />
                ) : (
                  <Play className="text-white fill-white ml-0.5" size={20} />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMute();
                }}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:cursor-pointer pointer-events-auto"
              >
                {isMuted ? (
                  <VolumeX className="text-white" size={20} />
                ) : (
                  <Volume2 className="text-white" size={20} />
                )}
              </button>
              <h1 className="text-4xl font-bold text-white">
                Partnering with PeopleOrbitAI
              </h1>
            </div>
          )}
        </div>

        {/* Hotspots Section */}
        <div
          ref={containerRef}
          className="relative w-full flex justify-between items-stretch gap-4 md:gap-8"
        >
          {HOTSPOTS.map((hs) => (
            <div
              key={hs.id}
              className="flex-1 flex flex-col items-center cursor-pointer group"
              onClick={(e) => handleImageClick(e, hs)}
            >
              <div className="w-full aspect-square max-w-[200px] ">
                <img
                  src={hs.img}
                  alt={hs.label}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-4 font-bold text-[#2F327D] text-lg">
                {hs.label}
              </p>
            </div>
          ))}

          {/* Tooltip rendering */}
          {activeData && (
            <div
              style={{
                position: "absolute",
                top: tooltipPos.top,
                left: tooltipPos.left,
                transform: tooltipPos.flipVertical
                  ? "translate(-50%, 20px)"
                  : "translate(-50%, calc(-100% - 20px))",
                zIndex: 50,
                width: 260,
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "18px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
              }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside tooltip
            >
              {/* Arrow */}
              <div
                style={{
                  position: "absolute",
                  bottom: tooltipPos.flipVertical ? "100%" : -10,
                  top: tooltipPos.flipVertical ? -10 : "auto",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 0,
                  height: 0,
                  borderLeft: "10px solid transparent",
                  borderRight: "10px solid transparent",
                  borderTop: tooltipPos.flipVertical
                    ? "10px solid transparent"
                    : "10px solid #fff",
                  borderBottom: tooltipPos.flipVertical
                    ? "10px solid #fff"
                    : "10px solid transparent",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 5,
                  height: "100%",
                  background: "#7F77DD",
                  borderRadius: "12px 0 0 12px",
                }}
              />

              <button
                onClick={() => setActiveData(null)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#9ca3af",
                  fontSize: 20,
                }}
              >
                ×
              </button>

              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                  margin: "0 0 8px",
                  paddingLeft: 8,
                }}
              >
                {activeData.label}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#4b5563",
                  margin: 0,
                  lineHeight: 1.5,
                  paddingLeft: 8,
                }}
              >
                {activeData.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhatWedo;
