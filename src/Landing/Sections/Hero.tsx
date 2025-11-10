import { FaArrowRight } from "react-icons/fa6";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="bg-[url('/heroBg.svg')] w-full h-screen bg-no-repeat bg-cover flex flex-col">
      {/* ----- Navbar (fixed height) ----- */}
      <Navbar />

      {/* ----- The rest of the screen ----- */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl w-full flex flex-col-reverse md:flex-row justify-start  md:justify-between gap-8 px-5 md:px-0 py-8 md:py-10 h-full ">
          {/* ----- Left column (text + CTA) ----- */}
          <div className="flex flex-col justify-center space-y-6  w-full md:w-1/2">
            <div className="gap-0">
              <div className="">
                <div>
                  <p className=" text-[1rem] md:text-xl font-open-san text-text-2nd ">
                    Latest integration just arrived
                  </p>
                  <h1 className="text-4xl md:text-[4rem] font-bold text-title-2nd hidden md:static">
                    AI Agents That
                  </h1>
                </div>
                <div>
                  <span className="text-4xl md:text-[4rem] font-bold text-main hidden md:static">
                    Empower HR
                  </span>
                </div>
                <div>
                  <h1 className="text-4xl md:text-[4rem] font-bold text-title-2nd">
                    AI Agents <br />
                    That{" "}
                    <span className="text-4xl md:text-[4rem] font-bold text-main">
                      Empower HR
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
                One agent helps you find the right talent, the other helps you
                grow it. Together, they make HR smarter, faster, and easier.
              </p>
            </div>

            <button className="flex items-center gap-2 w-fit bg-main px-6 py-3 rounded-full  hover:cursor-pointer transition text-white">
              <span className="text-lg">Get Started Now</span>
              <span className="bg-main-dark p-2 rounded-full">
                <FaArrowRight size={18} />
              </span>
            </button>
          </div>

          {/* ----- Right column (hero image) ----- */}
          <div className="flex items-center md:justify-end  w-full md:w-1/2 ">
            <img
              src="/heroImg.svg"
              alt="Hero illustration"
              className="max-w-full w-full h-auto md:-mr-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
