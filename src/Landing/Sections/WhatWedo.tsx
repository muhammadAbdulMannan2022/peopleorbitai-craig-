import React from "react";

const WhatWedo: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-10 md:py-16 bg-[#f7f7fa] px-5 md:px-0">
      <div className="max-w-7xl flex items-center flex-col gap-8 md:gap-16">
        <div className="flex flex-col items-center justify-center md:max-w-4xl gap-5">
          <h1 className="text-3xl md:text-6xl font-bold text-center text-title-2nd">
            What is <span className="text-main">PROMPTAi</span> Do?
          </h1>
          <p className="text-center text-base md:text-xl font-open-san text-text-2nd">
            TOTC is a platform that allows educators to create online classes
            whereby they can store the course materials online; manage
            assignments, quizzes and exams; monitor due dates; grade results and
            provide students with feedback all in one place.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-5 md:8">
          <div className="flex flex-col items-center">
            <h1 className="text-title-2nd font-bold text-2xl md:text-2xl mb-5 md:mb-2 ">
              Helper AI Talent Acquisition
            </h1>
            <div className="relative border-8 border-[#f7f7fa]  rounded-tl-4xl">
              <div className="relative z-10">
                <div className="absolute shadow w-20 h-20 -top-4 -right-4 md:hidden flex items-center justify-center rounded-full border-8 border-[#f7f7fa] bg-white">
                  <div className="bg-radial from-[#EFF0FD] to-main/10 w-full h-full rounded-full flex items-center justify-center">
                    <img
                      src="/logosm.svg"
                      className="aspect-square w-18 h-18"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <img src="/WhatDoR.jpg" className="rounded-tl-4xl" alt="" />
              <div className="w-full h-full bg-blue-600/10 absolute top-0 rounded-tl-4xl"></div>
              <div className="w-full h-[15%] bg-linear-to-b z-1 from-transparent via-[#f7f7fa] to-[#f7f7fa]  absolute -bottom-2 "></div>
            </div>
          </div>
          <div className="relative z-10">
            <div className="absolute w-30 h-30 -top-3 -left-15 hidden md:flex items-center justify-center rounded-full border-8 border-[#f7f7fa] bg-white">
              <div className="bg-radial from-[#EFF0FD] to-main/10 w-full h-full rounded-full flex items-center justify-center">
                <img
                  src="/logosm.svg"
                  className="aspect-square w-18 h-18"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h1 className="text-title-2nd font-bold text-2xl md:text-2xl mb-5 md:mb-2 ">
              Learning and Development of HR{" "}
            </h1>
            <div className="relative border-8 border-[#f7f7fa] rounded-tr-4xl">
              <div className="relative z-10">
                <div className="absolute shadow w-20 h-20 -top-4 -left-4 md:hidden flex items-center justify-center rounded-full border-8 border-[#f7f7fa] bg-white">
                  <div className="bg-radial from-[#EFF0FD] to-main/10 w-full h-full rounded-full flex items-center justify-center">
                    <img
                      src="/logosm.svg"
                      className="aspect-square w-18 h-18"
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <img src="WhatDoL.jpg" className="rounded-tr-4xl" alt="" />
              <div className="w-full h-full bg-blue-600/10 absolute top-0 rounded-tr-4xl"></div>
              <div className="w-full h-[15%] bg-linear-to-b z-1 from-transparent via-[#f7f7fa] to-[#f7f7fa]  absolute -bottom-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WhatWedo;
