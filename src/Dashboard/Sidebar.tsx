import { ArrowLeft, ArrowRight, Home, LogOut, User } from "lucide-react";
import { useState } from "react";

const agentsData = [
  {
    id: 1,
    name: "Liono",
    title: "Recruitment & Talent Acquisition",
    avatar: "/bot1.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    id: 2,
    name: "Romono",
    title: "HR Agent",
    avatar: "/bot2.png",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
];

export default function Sidebar({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) {
  const [activeAgentId, setActiveAgentId] = useState<number>(1);
  const activeAgent = agentsData.find((agent) => agent.id === activeAgentId);

  return (
    <aside
      className={`bg-green-400 absolute md:relative top-20 h-[calc(100vh-5rem)] left-0
      w-[90%] sm:w-[80%] md:w-[20%] md:min-w-[400px]
      transform transition-transform duration-300 z-10
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0`}
    >
      {/* toggle btn */}
      <button
        className="md:hidden absolute top-0 w-8 h-8 -right-8 bg-white mt-4 rounded-e-full flex items-center justify-center shadow"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <ArrowLeft className="text-title-2nd" size={18} />
        ) : (
          <ArrowRight className="text-title-2nd" size={18} />
        )}
      </button>

      <div className="w-full h-full flex">
        {/* left icons */}
        <div className="w-[20%] bg-dashboardMain flex flex-col items-center gap-3 py-4 px-2 md:4">
          {[Home, User, LogOut].map((Icon, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-dashboardNotActive/50 w-full aspect-square rounded-xl text-[10px] sm:text-xs cursor-pointer"
            >
              <Icon size={16} />
              <p>
                {Icon === Home ? "Home" : Icon === User ? "Profile" : "Logout"}
              </p>
            </div>
          ))}
        </div>

        {/* right content */}
        <div className="w-[80%] bg-linear-to-b from-dashboardMain to-[#150A29] relative">
          {/* agent tabs */}
          <div className="flex absolute top-0 w-full px-3 sm:px-5 z-40">
            {agentsData.map((agent, index) => (
              <div
                key={agent.id}
                onClick={() => setActiveAgentId(agent.id)}
                className={`flex items-center gap-2 w-full px-2 py-1 sm:px-3 sm:py-2 cursor-pointer
                ${
                  activeAgentId === agent.id
                    ? "bg-dashboardActive/50"
                    : "bg-dashboardActive/80"
                }
                ${index === 0 ? "rounded-bl-2xl" : "rounded-br-2xl"}`}
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full p-[3px]
                  ${
                    activeAgentId === agent.id
                      ? "bg-[linear-gradient(#7F4DE0,#8F1CAC,#F7F9FF,#7F4DE0)]"
                      : ""
                  }`}
                >
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-full h-full rounded-full object-cover object-top bg-white"
                  />
                </div>
                <p className="font-semibold text-xs sm:text-sm">{agent.name}</p>
              </div>
            ))}
          </div>

          {/* agent info */}
          {activeAgent && (
            <div>
              <div className="relative flex items-center justify-center flex-col w-full h-[350px] md:h-[400px] overflow-hidden">
                {/* image */}
                <img
                  src={activeAgent.avatar}
                  alt={activeAgent.name}
                  className="absolute top-18 md:top-24 sm:top-28 w-[55%] sm:w-[45%] md:w-[40%]
                  h-full object-cover object-top z-20"
                />

                {/* circles */}
                <div
                  className="absolute z-10 w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52
                  bg-dashboardNotActive/60 -mt-5 rounded-full flex items-center justify-center"
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                  }}
                >
                  <div
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44
                    bg-dashboardMain/50 rounded-full flex items-center justify-center"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                    }}
                  >
                    <div
                      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32
                      bg-[#551bc7] rounded-full"
                      style={{
                        boxShadow:
                          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      }}
                    />
                  </div>
                </div>

                {/* info */}
                <div
                  className="bg-linear-to-b from-transparent from-5% via-40% to-55% via-[#3A1A7F] to-[#3A1A7F]
                w-full h-28 sm:h-32 md:h-40 absolute bottom-0 z-30 flex items-end justify-center px-5"
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-bold">
                      Agent {activeAgent.name}
                    </h1>
                    <h1 className="text-xs sm:text-sm mb-2 text-gray-300 font-bold mt-0.5">
                      {activeAgent.title}
                    </h1>
                    <p className="text-gray-200 text-xs sm:text-sm line-clamp-2 sm:line-clamp-3">
                      {activeAgent.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
