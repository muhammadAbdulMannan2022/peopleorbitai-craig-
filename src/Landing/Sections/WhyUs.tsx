import React from "react";
import { BoxSelect, Waves, Map } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
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
      {icon}
    </div>
    <div className="flex flex-col text-center md:text-left">
      <h3 className="text-title-2nd font-extrabold text-2xl mb-3 opacity-90">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-lg max-w-2xl">
        {description}
      </p>
    </div>
  </div>
);

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <BoxSelect size={32} />,
      iconBg: "bg-[#7db343]",
      title: "One time payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. Lorem ipsum dolor sit amet, consectetur",
    },
    {
      icon: <Waves size={32} />,
      iconBg: "bg-[#4db6ac]",
      title: "Modifyable payment",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. Lorem ipsum dolor sit amet, consectetur",
    },
    {
      icon: <Map size={32} />,
      iconBg: "bg-[#9575cd]",
      title: "Accurate Heatmap",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna, tortor tempus. Lorem ipsum dolor sit amet, consectetur",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <span className="text-text-2nd font-medium text-lg tracking-normal mb-4 block">
            Easy and Fast response
          </span>
          <h2 className="text-6xl md:text-7xl font-black text-title-2nd mb-6 tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-text-2nd text-xl">
            Lorem ipsum dolor sit amet, consectetur
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
              src="/whyus.png"
              alt="why us"
              className="w-full h-auto md:w-[80%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
