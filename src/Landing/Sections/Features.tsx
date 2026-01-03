import React from "react";

// --- Types ---
interface Agent {
  id: string;
  name: string;
  avatar: string;
  description: string;
}

interface FeatureContent {
  tag: string;
  title: string;
  body: string;
}

// --- Constants ---
const AGENTS: Agent[] = [
  {
    id: "1",
    name: "Agent Liono",
    avatar: "/bot1.png",
    description:
      "Our lead material specialist with over 15 years in luxury upholstery and sustainable sourcing. Liono ensures every thread meets the Panto gold standard.",
  },
  {
    id: "2",
    name: "Agent Romono",
    avatar: "/bot2.png",
    description:
      "Romono focuses on structural integrity and ergonomic design, blending traditional craftsmanship with modern engineering principles.",
  },
];

const MAIN_CONTENT: FeatureContent = {
  tag: "MATERIALS",
  title: "Very Serious Materials For Making Furniture",
  body: "Because Panto is deeply committed to designing furniture that respects our environment, we utilize premium, globally-recognized materials while maintaining surprisingly accessible pricing. Our philosophy balances high-end aesthetics with structural longevity, ensuring that every piece is not just furniture, but a lifelong companion for your home. We source our wood from certified sustainable forests and our metals from recycled high-grade alloys.",
};

// --- Internal Sub-component ---
const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => (
  <div className="bg-[#f8f7ff] rounded-3xl p-6 shadow-sm flex flex-col items-start gap-4 transition-all duration-300 hover:shadow-md h-full">
    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[linear-gradient(#7F4DE0,#8F1CAC,#F7F9FF,#7F4DE0)] p-[3px]">
      <div className="w-full h-full rounded-full overflow-hidden bg-[#F7F9FF]">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
    <div className="flex-1">
      <h4 className="text-text-2nd font-bold text-lg mb-2">{agent.name}</h4>
      <p className="text-[#8A8CA1] text-sm leading-relaxed text-left">
        {agent.description}
      </p>
    </div>
  </div>
);

export const FeatureSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 lg:py-24">
      {/* Section Header */}
      <div className="text-center mb-16 md:mb-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-title-2nd mb-4">
          Exclusive Features
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Experience the harmony of traditional craftsmanship and visionary
          design.
        </p>
      </div>

      {/* Grid: items-stretch ensures same height for left and right columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
        {/* Left Column: Image & Agents */}
        <div className="flex flex-col gap-8 h-full">
          <div className="relative group overflow-hidden rounded-3xl shadow-xl grow w-full max-h-96">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
              alt="Expert Design Team"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 min-h-[400px] max-h-36"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-medium">
                Crafted with precision by our experts.
              </p>
            </div>
          </div>

          {/* Agents Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 shrink-0">
            {AGENTS.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Right Column: Content takes entire height of the container */}
        <div className="flex flex-col h-full bg-[#fafafa] lg:bg-transparent rounded-[2.5rem] lg:rounded-none p-8 lg:p-0">
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-main font-bold tracking-widest text-sm mb-6 inline-block">
              {MAIN_CONTENT.tag}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-title-2nd leading-[1.1] mb-10">
              {MAIN_CONTENT.title}
            </h1>
            <p className="text-[#4b5563] text-xl leading-relaxed mb-12">
              {MAIN_CONTENT.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
