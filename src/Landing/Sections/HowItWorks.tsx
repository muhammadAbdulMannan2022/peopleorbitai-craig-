import React from "react";
import { MousePointer2 } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ step, title, description }) => (
  <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 flex flex-col items-start text-left transition-transform hover:-translate-y-2 duration-300">
    <div className="bg-[#d85a36] w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-orange-200">
      <MousePointer2 size={24} />
    </div>
    <span className="text-gray-400 font-bold text-sm mb-4 uppercase tracking-wider">
      Step {step}
    </span>
    <h3 className="text-[#1a1a2e] font-extrabold text-2xl mb-4">{title}</h3>
    <p className="text-gray-500 leading-relaxed text-base">{description}</p>
  </div>
);

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      label: "Sign Up",
      bgColor: "bg-[#f43f5e]", // Pink
    },
    {
      number: "02",
      label: "Subscribe",
      bgColor: "bg-[#f59e0b]", // Orange
    },
    {
      number: "03",
      label: "Start Use",
      bgColor: "bg-[#8b5cf6]", // Purple
    },
  ];

  return (
    <section className="py-24 px-4 md:px-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-20">
          <span className="text-[#6d28d9] font-semibold text-sm tracking-widest uppercase mb-4 block">
            Easy and Fast response
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-[#1a1a2e] mb-6 tracking-tight">
            How It Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto px-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore.
          </p>
        </div>

        {/* Process Timeline */}
        <div className=" mb-28 max-w-5xl mx-auto ">
          {/* Main Connector Line */}

          <div className="flex flex-row justify-between items-start z-10 ">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center group flex-1 relative"
              >
                <div
                  className={`absolute md:top-[30%] top-[34%] left-0 right-0 h-0.5 md:h-2 ${
                    idx == 0
                      ? "rounded-s-full"
                      : idx == 2
                      ? "rounded-e-full"
                      : ""
                  } bg-[#EBEEF2] z-0`}
                ></div>
                {/* Main Step Circle */}
                <div className="flex items-center gap-1">
                  <div className="md:w-4 md:h-4 h-2 w-2 z-10 rounded-full bg-[#BFCAD6]"></div>
                  <div
                    className={`p-3 rounded-full rotate-45 ${
                      idx != 1 ? "border-b border-r" : " border-t border-l"
                    } border-dashed border-slate-300 bg-slate-50`}
                  >
                    <div
                      className={`relative w-14 h-14  -rotate-45 md:w-20 md:h-20 rounded-full border-[6px] md:border-8 border-[#1e293b] ${step.bgColor} flex items-center justify-center shadow-xl transition-transform group-hover:scale-110 duration-300 ring-4 ring-white`}
                    >
                      <span className="text-xl md:text-2xl font-black text-white cursor-default">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-4 md:h-4 h-2 w-2 z-10 rounded-full bg-[#BFCAD6]"></div>
                </div>

                {/* Label Text */}
                <span className="mt-4 md:mt-8 text-title-2nd font-bold text-sm md:text-xl tracking-tight whitespace-nowrap">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard
            step={1}
            title="One Time Payment"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. Lorem ipsum dolor sit amet, consectetur"
          />
          <StepCard
            step={2}
            title="Choose Membership"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. Lorem ipsum dolor sit amet, consectetur"
          />
          <StepCard
            step={3}
            title="Enjoy the Service"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. Lorem ipsum dolor sit amet, consectetur"
          />
        </div>
      </div>
    </section>
  );
};
