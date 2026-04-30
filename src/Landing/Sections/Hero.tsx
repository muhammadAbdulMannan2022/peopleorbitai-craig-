import { FaArrowRight } from "react-icons/fa6";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('/heroBg.svg')] w-full h-screen bg-no-repeat bg-cover flex flex-col">
      {/* ----- Navbar (fixed height) ----- */}
      <Navbar />

      {/* ----- The rest of the screen ----- */}
      <div className="flex-1 flex items-center justify-center overflow-x-hidden px-5 md:px-10">
        <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row justify-start  md:justify-between gap-8 px-5 md:px-0 py-8 md:py-10 h-full ">
          {/* ----- Left column (text + CTA) ----- */}
          <div className="flex flex-col justify-center space-y-6  w-full md:w-1/2">
            <div className="gap-0">
              <div className="">
                <div>
                  {/* <p className=" text-[1rem] md:text-xl font-open-san text-text-2nd ">
                    People Orbit AI
                  </p> */}
                  <h1 className="text-4xl md:text-[4rem] font-bold text-title-2nd hidden md:static">
                    The Future of AI for TA & HR is Here
                  </h1>
                </div>
                <div>
                  <span className="text-4xl md:text-[4rem] font-bold text-main hidden md:static">
                    Consult. Train. Agents.
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-[4rem] font-bold text-title-2nd">
                    The Future of AI for TA & HR is Here{" "}
                    <span className="text-4xl md:text-[4rem] font-bold text-main">
                      Consult. Train. Agents.
                    </span>
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex items-center mt-1 md:mt-5">
              <div className="">
                <img
                  src="/logosm.svg"
                  className="md:w-24 w-20 h-20 md:h-24 -ms-2.5"
                  alt="Bot"
                />
              </div>
              <p className="text-[1rem] text-text-2nd w-full md:w-[50%]">
                AI is already changing the way we work. Are you ready to change
                the way you work? People Orbit AI will supercharge your TA & HR
                function for the realities of AI, adding real value to your
                business and your function.
              </p>
            </div>

            <button
              onClick={() => {
                navigate("/auth/signup");
              }}
              className="flex items-center gap-2 w-fit bg-main px-6 py-3 rounded-full  hover:cursor-pointer transition text-white"
            >
              <span className="text-lg">Get Started Now</span>
              <span className="bg-main-dark p-2 rounded-full">
                <FaArrowRight size={18} />
              </span>
            </button>
          </div>

          {/* ----- Right column (hero image) ----- */}
          <div className="flex items-center md:justify-end  w-full md:w-1/2 ">
            <img
              src="/heroImg2.png"
              alt="Hero illustration"
              className="max-w-full w-full h-auto md:-mr-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
