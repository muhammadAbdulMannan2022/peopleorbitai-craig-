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
  const videoRef = useRef<HTMLVideoElement>(null);
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
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };
  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const handleTimeUpdate = () => {
    // If the video has moved past 0, we consider it "started"
    if (videoRef.current && videoRef.current.currentTime > 0) {
      setIsVideoStarted(true);
    }
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
          <video
            ref={videoRef}
            className={`w-full h-full object-cover `}
            onClick={toggleVideo}
            onTimeUpdate={handleTimeUpdate}
            playsInline
            muted
          >
            <source
              src="https://r1---sn-jpgjax-q5js.googlevideo.com/videoplayback?expire=1778155033&ei=uCn8acjhONaCi9oPrK6ewA8&ip=5.180.61.107&id=o-AIN_HqYPYwfQ2yB7ZgETQW3MLxAuh4AXphrAEsUrBj2O&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AbKmrwrMxHrI_1n2AY6nTr_KTW9iDvhp7_PK_Shi-jvQrPoDOxN2yxVeCR2DLraQ4-zQ3xEhiQZaylhn&spc=96Xrv98dWePLLFizQc3eJJyTCQHXmBCLViHPgXWDw7rN_w20sFy3gVFQGm84g5iogxImqp7n&vprv=1&svpuc=1&mime=video%2Fmp4&ns=qJSTs8iKbLndNjSEREz7P1QU&rqh=1&gir=yes&clen=6231275&ratebypass=yes&dur=141.038&lmt=1778132734630876&fexp=51565116%2C51565682%2C51887891&c=WEB&sefc=1&txp=6209224&n=sbhtIHNIUH79_w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AHEqNM4wRgIhAIT4T13zwGdHAR5Yz5ZrfziBXa1Nn8lBY_p4Kmf22d5YAiEA3YS07SfOjMQPmh2_XzB3fkvrwvjILMfmVc9Cbv3951I%3D&pot=MtYEv3Ym6Z_qUcm_NP_vCL_Jp5nHg4EqP0Mofw0aIhZg7wNjaOAip3UMog9eTwBNPvzKF9olDHsLlxQZeSS-ooC5Z4VzOpjSEbj2wTxJJXpZbvm2R8xBH2Q7fyViuDqjYRzJ0sUh-_SawwcOZ2wmIwnQMhauAXtXd19iACfcAIETMC3tS_R_I7MgXe96EvXJ9wya1FRaHlYW-9QIMhEieNZQf7popVaJN30K1wnuWmzzQVza6x3qdpqfgpXr150tNJ92va30HxtKLm5qFyYrHE6vnssET5FwwTbIUPpZ5hCyWrcs_1o8mdDv42QaaqfKnBgmnC7dZl_XdPDezdI5QYtvEhe9ZCLy9pdDeQwaOBxVl9TQTvaToejW87NjkjVFM47Qq67fiHyVN7sp4dFFR1lj-20ZGMOlxasDVHf_4VsaJpS9GGoSePZ2-KOFTXcf2VmBMrg2iGvX7RH2OkVUjYxPwL-vrAx8sUpdJog7BOn7t0Hwqbr9dibYg1pBULIQKPQ4OxXrlIP7YblxGho0bwhfhGrD0QD8s7fJcclM_-rPyRYVi6GJM5W5sSz85VET91-CzdVNmppieOvh5eB8z87Nz9yjH9VBsHaNHjlRWIauXa3rNdV5euOW1tcgDtcicwGh4sluT6sNBcwl8remR0ZIa27IaZVcnUz_aDS-7b2AANoliy3MUZlUWbDYG0p0rfzBMhp1wxCfgO9s92FJnJr8WVPPVylBflXEk4q7gCzFsIlmHhALBwbnRwfWP2mq3wPrRxcr_rZUWZbUmQwZ8_P45Vg6ZcMQuA%3D%3D&cver=2.20260206.01.00&alr=no&pot=MuIEmVO2g79PyfeZbeWGYy3F2qE2na0CD9-y1pf_FCt6fS9hJEAQUBX2fudg3ipk7pX53476s5S5IygmPc7fMa4rYs_rKPwm2Qc4g7iYMbM6u_RuC7HICi3Bm_xVvh3nyeo0VQ5WptDQjF0kPSRcBmOuowJUXPRdHulhSvtpL13G6X6KGplBJ1tfIkhiUbyliby-SEN-fMYk6orsqpkQlmHZBEH7fkql2s_KHmsGeVZcOR6Og_lU9qATnTktKVNoKtiORi2nMzvhS7scdbIa6y-X5TgtRy6HKm5I661We9590BZKkvisIHbLRNp5C5wvim4T5O-1oshQIx75wBWzAYIf71zdMVcs_zAJX5DTO8E_zt4eMOgwVWYXjS2a4S1Hdxn6wZye6EzMLsqbmc87hIQ-wAgHXsngVGUaTNNosY5bHlRrVCPSl_W2Yd5ShkOcAtPBjVfpC1U8PPbjJKzNa2EIw9AY00f93fZH9GTuxVRhtIP2tmNK7s4HXi4hkux9d5ICPt8ONwO96nAQk1pYkWUaTJE8ggidyhhU6xvyVSRxzBpn08K4vQhmu6c1CTe-bmfLpuimrOSRAjUF6A-ALTVQOUTR5eqqsBW6ROWpPhHFEqWgeOlcWfX7JeI0uCJuRSQhdqInh51TQpW8oXR32ZGTqLcdOH9OMRRflAcL3G2eGtoJyE-8RImHVvDVW2XWTbO0HAfZs55ODX9iE_sCrbT6ZdHHo4kM_QoO6uMXMgT1usCvZW8CIf_BveFXG_fSjoch5fV-WOu-S_PuSPQfwh54golAurlGpWbMfBShKpl2m05Gug==&title=PeopleOrbitAi+Video&cms_redirect=yes&cps=123&met=1778133466,&mh=Hs&mip=103.186.20.8&mm=31&mn=sn-jpgjax-q5js&ms=au&mt=1778132953&mv=m&mvi=1&pcm2cms=yes&pl=24&lsparams=cps,met,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl,rms&lsig=APaTxxMwRQIhAK3QyAMWA4oegMezvNvvwCsqX5WMXR76GpgnqxHOjAjPAiAdj0D6lQn23BKLZJVNGsXB2zO5QMSS4pnPmeDL2dzMkA%3D%3D"
              type="video/mp4"
            />
          </video>
          {(!videoRef.current || !isVideoStarted) && (
            <img
              src="/your-video-placeholder.png"
              alt=""
              className=" absolute inset-0 w-full h-full object-cover"
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
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/20 to-transparent p-4 flex gap-4">
              <button
                onClick={toggleVideo}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="text-white fill-white" size={20} />
                ) : (
                  <Play className="text-white fill-white ml-0.5" size={20} />
                )}
              </button>
              <button
                onClick={toggleMute}
                className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:cursor-pointer"
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
