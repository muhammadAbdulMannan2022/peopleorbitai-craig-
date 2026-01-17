import React from "react";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

const PricingPlans: React.FC = () => {
  const navigate = useNavigate();
  const plans = [
    {
      price: "100",
      type: "Standard",
      features: [
        "Unlimited AI Recommendations",
        "Advanced & Personalized Suggestions",
        "Full Conversation History",
        "Priority Affiliate Deals",
        "AI Memory & Preferences",
        "Priority Support",
      ],
      description:
        "The Professional Plan Offers The Best Value With AI Automation, Seamless Integrations, And Priority Support",
      buttonText: "Get Started",
      isFeatured: false,
    },
    {
      price: "100",
      type: "Professional",
      features: [
        "Unlimited AI Recommendations",
        "Advanced & Personalized Suggestions",
        "Full Conversation History",
        "Priority Affiliate Deals",
        "AI Memory & Preferences",
        "Priority Support",
      ],
      description:
        "The Professional Plan Offers The Best Value With AI Automation, Seamless Integrations, And Priority Support",
      buttonText: "Upgrade Now",
      isFeatured: true,
    },
    {
      price: "100",
      type: "Enterprise",
      features: [
        "Unlimited AI Recommendations",
        "Advanced & Personalized Suggestions",
        "Full Conversation History",
        "Priority Affiliate Deals",
        "AI Memory & Preferences",
        "Priority Support",
      ],
      description:
        "The Professional Plan Offers The Best Value With AI Automation, Seamless Integrations, And Priority Support",
      buttonText: "Get Started",
      isFeatured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Back Button */}
        <button
          onClick={() => {
            navigate("/dashboard/profile");
          }}
          className="flex items-center hover:cursor-pointer gap-1 text-[#8E99AF] hover:text-[#464E5F] transition-colors font-medium mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back to Profile</span>
        </button>

        {/* Status Header Card */}
        <div className="bg-white rounded-2xl border border-[#EBEDF3] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-[#464E5F]">
              Our Pricing Plans
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD7001A] rounded-lg flex items-center justify-center">
                <span className="text-xl">👑</span>
              </div>
              <p className="text-[#464E5F] font-medium">
                Professional Plan <span className="text-main">(Current)</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[#8E99AF] text-sm">
              Status{" "}
              <span className="block md:inline ml-2 text-[#464E5F] font-normal opacity-60 text-xs">
                (Valid Till: 21/02/2025)
              </span>
            </p>
            <button className="px-6 py-2 hover:cursor-pointer border border-[#FF5B5B] text-[#FF5B5B] rounded-lg hover:bg-[#FF5B5B] hover:text-white transition-all text-sm font-medium">
              Cancel subscription
            </button>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl transition-all duration-300 overflow-hidden flex flex-col ${
                plan.isFeatured
                  ? "bg-white shadow-2xl scale-105 z-10 border border-[#8B7EF022]"
                  : "bg-[#F3F6F9] shadow-md hover:scale-105 hover:bg-white hover:shadow-xl"
              }`}
            >
              {/* Card Header */}
              <div
                className={`p-8 text-center relative ${plan.isFeatured ? "bg-main text-white" : "text-[#464E5F]"}`}
              >
                {plan.isFeatured && (
                  <div className="absolute top-4 right-4 text-2xl">👑</div>
                )}
                <div className="flex justify-center items-baseline gap-1">
                  <span className="text-4xl font-bold">$</span>
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={`text-sm font-medium opacity-80`}>
                    /Per Month
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-white p-8 flex-1 flex flex-col gap-6">
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-[#464E5F] text-sm font-medium"
                    >
                      <CheckCircle2
                        size={18}
                        className={
                          plan.isFeatured ? "text-[#464E5F]" : "text-[#8E99AF]"
                        }
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 border-t border-[#EBEDF3] text-center">
                  <p className="text-[10px] text-[#8E99AF] leading-relaxed px-4 mb-6">
                    {plan.description}
                  </p>

                  <button
                    className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg hover:cursor-pointer ${
                      plan.isFeatured
                        ? "bg-main/90 text-white hover:bg-main/80  shadow-[#8B7EF033]"
                        : "bg-white text-[#464E5F] border border-[#EBEDF3] hover:bg-[#F8FAFC]"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
