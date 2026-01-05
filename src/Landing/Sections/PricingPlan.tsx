import React from "react";
import { CheckCircle2 } from "lucide-react";

interface PlanProps {
  price: string;
  isFeatured?: boolean;
  features: string[];
  footerNote: string;
  buttonLabel: string;
}

const PlanCard: React.FC<PlanProps> = ({
  price,
  isFeatured,
  features,
  footerNote,
  buttonLabel,
}) => {
  return (
    <div
      className={`relative flex flex-col rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:translate-y-2 ${
        isFeatured
          ? "bg-white shadow-2xl scale-105 z-10 border-none"
          : "bg-[#f4f4f4] shadow-lg border border-gray-100"
      }`}
    >
      {/* Top Header Section */}
      <div
        className={`pt-12 pb-10 px-8 text-center flex flex-col items-center justify-center ${
          isFeatured ? "bg-[#777CDC] text-white" : "text-title-2nd"
        }`}
      >
        {isFeatured && (
          <div className="absolute top-8 right-8">
            <div className="w-10 h-10 ounded-lg flex items-center justify-center transform rotate-12">
              <span className="text-4xl">👑</span>
            </div>
          </div>
        )}
        <div className="flex items-baseline gap-1 ">
          <span className="text-4xl md:text-5xl font-black">{price}</span>
          <span className={`text-sm font-semibold opacity-80`}>/Per Month</span>
        </div>
      </div>

      {/* Feature List Section */}
      <div className="bg-white grow px-8 py-10">
        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-4 text-[#475569] font-medium text-sm md:text-base"
            >
              <CheckCircle2
                size={20}
                className={isFeatured ? "text-[#7c7cf1]" : "text-title-2nd"}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Action Section */}
      <div className={`px-8 pb-10 pt-4 text-center bg-[#EFEFF2]`}>
        <p className="text-[10px] md:text-xs text-slate-400 mb-8 leading-relaxed px-4">
          {footerNote}
        </p>
        <button
          className={`w-full py-4 rounded-2xl font-bold text-sm md:text-base transition-all active:scale-95 border hover:cursor-pointer ${
            isFeatured
              ? "bg-[#8A7DE6] text-white hover:bg-[#6366f1] border-[#8A7DE6]"
              : "bg-white text-title-2nd border-gray-100 hover:bg-slate-50"
          }`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export const PricingPlans: React.FC = () => {
  const plans: PlanProps[] = [
    {
      price: "$100",
      features: [
        "Unlimited AI Recommendations",
        "Advanced & Personalized Suggestions",
        "Full Conversation History",
        "Priority Affiliate Deals",
        "AI Memory & Preferences",
        "Priority Support",
      ],
      footerNote:
        "The Professional Plan Offers The Best Value With AI Automation, Seamless Integrations, And Priority Support",
      buttonLabel: "Get Started",
    },
    {
      price: "$100",
      isFeatured: true,
      features: [
        "Unlimited AI Recommendations",
        "Advanced & Personalized Suggestions",
        "Full Conversation History",
        "Priority Affiliate Deals",
        "AI Memory & Preferences",
        "Priority Support",
      ],
      footerNote:
        "The Professional Plan Offers The Best Value With AI Automation, Seamless Integrations, And Priority Support",
      buttonLabel: "Upgrade Now",
    },
    {
      price: "$100",
      features: [
        "Unlimited AI Recommendations",
        "Advanced & Personalized Suggestions",
        "Full Conversation History",
        "Priority Affiliate Deals",
        "AI Memory & Preferences",
        "Priority Support",
      ],
      footerNote:
        "The Professional Plan Offers The Best Value With AI Automation, Seamless Integrations, And Priority Support",
      buttonLabel: "Get Started",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-title-2nd mb-6 tracking-tight">
            Our Pricing Plans
          </h2>
          <p className="text-text-2nd text-lg max-w-xl mx-auto">
            Choose a plan that fits your needs, from monthly to annual options.
            Enjoy premium features today.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-center pt-8">
          {plans.map((plan, index) => (
            <PlanCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};
