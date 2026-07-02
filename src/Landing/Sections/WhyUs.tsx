import React from "react";

interface FeatureCardProps {
  icon: string;
  iconBg: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  iconBg,
  title,
  description,
}) => (
  <div className="bg-white rounded-[2.5rem] p-5 md:p-8  flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 shadow-sm border border-gray-50 hover:shadow-md transition-shadow duration-300">
    <div
      className={`${iconBg} w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-3xl flex items-center justify-center text-white shadow-lg`}
    >
      <img src={icon} alt={title} />
    </div>
    <div className="flex flex-col text-center md:text-left">
      <h3 className="text-title-2nd font-extrabold text-lg lg:text-2xl mb-3 opacity-90">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-base lg:text-lg max-w-2xl">
        {description}
      </p>
    </div>
  </div>
);

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: "/audit.jpeg",
      iconBg: "bg-[#7db343]",
      title: "Expertise in AI Consulting",
      description:
        "We will assess your AI-readiness and provide a clear and achievable roadmap to ensure you are benefitting from the AI revolution.",
    },
    {
      icon: "/agent.jpeg",
      iconBg: "bg-[#4db6ac]",
      title: "AI Training for your entire Team",
      description:
        "How can you make the most of AI if you don’t understand what you’re doing? PeopleOrbit is here to help with guided learning and actionable outcomes.",
    },
    {
      icon: "/train.jpeg",
      iconBg: "bg-[#9575cd]",
      title: "AI Agents who assist you with what you need",
      description:
        "Everybody deserves an assistant to complete the mundane and repetitive tasks that take up so much of your day – now you have one!",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-6xl md:text-7xl font-black text-title-2nd mb-6 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-text-2nd text-xl">
            We are the AI experts for TA & HR.
          </p>
        </div>

        <div className="flex flex-col md:flex-row ">
          {/* Feature List */}
          <div className="flex flex-col gap-6 md:gap-8 flex-1 md:w-1/2 w-full">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                iconBg={feature.iconBg}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
          <div className="flex-1 md:w-1/2 w-full mt-5 md:mt-0 flex justify-end">
            <img
              src="/hwimg.png"
              alt="why us"
              className="w-full lg:w-[80%] h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
