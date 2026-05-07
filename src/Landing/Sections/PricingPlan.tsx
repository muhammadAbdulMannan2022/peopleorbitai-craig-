import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router";

interface PlanOption {
  name: string;
  monthly: string;
  annual: string;
  addTrainingMonthly?: string;
  addTrainingAnnual?: string;
}

interface PricingTier {
  title: string;
  seats: string;
  description: string;
  options: PlanOption[];
  hidePricing?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

const PricingTierCard: React.FC<PricingTier> = ({
  title,
  seats,
  description,
  options,
  hidePricing,
  buttonText,
  buttonLink,
}) => {
  const [isAnnual, setIsAnnual] = React.useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
      <div className="pt-10 pb-6 px-8 text-center bg-[#777CDC] text-white">
        <h3 className="text-2xl font-black mb-1">{title}</h3>
        <p className="text-white/80 text-sm mb-4">{seats}</p>
        <p className="text-white/60 text-xs mb-6">{description}</p>
        {!hidePricing && (
          <>
            <div className="flex justify-center bg-white/10 rounded-lg p-1 w-fit mx-auto">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!isAnnual ? "bg-white text-[#777CDC]" : "text-white/70"
                  }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isAnnual ? "bg-white text-[#777CDC]" : "text-white/70"
                  }`}
              >
                Annual
              </button>
            </div>
            <div className="text-3xl font-black mt-4">
              From $
              {isAnnual
                ? (
                  parseFloat(options[0].annual.replace(/,/g, "")) +
                  (options[0].addTrainingAnnual
                    ? parseFloat(options[0].addTrainingAnnual.replace(/,/g, ""))
                    : 0)
                ).toFixed(2)
                : (
                  parseFloat(options[0].monthly) +
                  (options[0].addTrainingMonthly
                    ? parseFloat(options[0].addTrainingMonthly)
                    : 0)
                ).toFixed(2)}
              /{isAnnual ? "yr" : "mo"}
            </div>
          </>
        )}
        {hidePricing && (
          <div className="h-[104px] flex flex-col items-center justify-center mt-2">
            <span className="text-2xl font-black text-white">Custom Pricing</span>
            <span className="text-sm text-white/80 mt-1">Tailored to your needs</span>
          </div>
        )}
      </div>

      <div className="p-8">
        <ul className="space-y-4">
          {options.map((option, idx) => {
            const basePrice = isAnnual
              ? parseFloat(option.annual.replace(/,/g, ""))
              : parseFloat(option.monthly);
            const trainingPrice = isAnnual
              ? option.addTrainingAnnual
                ? parseFloat(option.addTrainingAnnual.replace(/,/g, ""))
                : 0
              : option.addTrainingMonthly
                ? parseFloat(option.addTrainingMonthly)
                : 0;
            const total = (basePrice + trainingPrice).toFixed(2);

            return (
              <li key={idx} className="bg-[#f8f8f8] rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-[#464E5F]">
                    {option.name}
                  </span>
                  {!hidePricing && (
                    <div className="text-right">
                      <span className="text-xl font-black text-[#777CDC]">
                        ${total}
                      </span>
                      <span className="text-xs text-gray-500">
                        /{isAnnual ? "yr" : "mo"}
                      </span>
                    </div>
                  )}
                </div>
                {/* {option.addTrainingMonthly && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Plus size={12} />
                    Add Training +${isAnnual ? option.addTrainingAnnual : option.addTrainingMonthly}/{isAnnual ? "yr" : "mo"}
                  </div>
                )} */}
                {/* {idx === 0 && (
                  <div className="text-xs text-green-600 mt-2 font-medium">
                    Best Value
                  </div>
                )} */}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <CheckCircle2 size={18} className="text-green-500" />
            Email Support
          </div>
          <button
            onClick={() => {
              if (buttonLink) {
                if (buttonLink.startsWith('mailto:')) {
                  window.location.href = buttonLink;
                } else {
                  navigate(buttonLink);
                }
              } else {
                navigate("/auth/signup");
              }
            }}
            className="w-full py-4 hover:cursor-pointer rounded-2xl font-bold bg-[#8A7DE6] text-white hover:bg-[#6366f1] transition-all"
          >
            {buttonText || "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const PricingPlans: React.FC = () => {
  const tiers: PricingTier[] = [
    {
      title: "Solo Pro",
      seats: "(1 seat)",
      description: "Best for individuals",
      options: [
        {
          name: "Either HR or TA agent",
          monthly: "39",
          annual: "390",
          addTrainingMonthly: "9.95",
          addTrainingAnnual: "99.50",
        },
        {
          name: "Both Agents",
          monthly: "59",
          annual: "590",
          addTrainingMonthly: "9.95",
          addTrainingAnnual: "99.50",
        },
        // { name: "Training Only", monthly: "9.95", annual: "99.50" },
      ],
    },
    {
      title: "Team Flex",
      seats: "(5 seats)",
      description: "Best for small teams",
      options: [
        {
          name: "Either HR or TA agent",
          monthly: "175",
          annual: "1,750",
          addTrainingMonthly: "39.95",
          addTrainingAnnual: "399.50",
        },
        {
          name: "Both Agents",
          monthly: "275",
          annual: "2,750",
          addTrainingMonthly: "39.95",
          addTrainingAnnual: "399.50",
        },
        // { name: "Training Only", monthly: "39.95", annual: "399.50" },
      ],
    },
    {
      title: "Enterprise+",
      seats: "(6+ seats)",
      description: "Best for large organizations",
      hidePricing: true,
      buttonText: "Contact us for Pricing",
      buttonLink: "mailto:info@peopleorbitai.com",
      options: [
        {
          name: "Either HR or TA agent",
          monthly: "29",
          annual: "290",
          addTrainingMonthly: "8.95",
          addTrainingAnnual: "89.50",
        },
        {
          name: "Both Agents",
          monthly: "49",
          annual: "490",
          addTrainingMonthly: "8.95",
          addTrainingAnnual: "89.50",
        },
        // { name: "Training Only", monthly: "8.95", annual: "89.50" },
      ],
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 md:px-16 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-title-2nd mb-6 tracking-tight">
            Our Pricing Plans
          </h2>
          <p className="text-text-2nd text-lg max-w-xl mx-auto">
            Choose a plan that fits your needs, from monthly to annual options.
            All prices +GST
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, idx) => (
            <PricingTierCard key={idx} {...tier} buttonLink="mailto:info@peopleorbitai.com" />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-title-2nd mb-4">
              Custom Agents
            </h3>
            <p className="text-text-2nd mb-6">Please contact for pricing</p>
            <ul className="space-y-3 text-[#475569] mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#7c7cf1]" />
                Tailored Agents
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#7c7cf1]" />
                Locked Privacy Server
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#7c7cf1]" />
                Customised Knowledge Bank
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-[#7c7cf1]" />
                Integrations
              </li>
            </ul>
            <Link
              to="mailto:craig@talentflexx.com"
              className="px-8 py-4 rounded-2xl font-bold bg-[#8A7DE6] text-white hover:bg-[#6366f1] transition-all border border-[#8A7DE6]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
