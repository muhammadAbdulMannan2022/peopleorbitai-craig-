import React from "react";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router";

interface PlanOption {
  name: string;
  monthly: number;
  annual: number;
  addTraining?: {
    monthly: number;
    annual: number;
  };
}

interface PricingTier {
  title: string;
  seats: number | string;
  perSeat?: boolean;
  description: string;
  options: PlanOption[];
  isFeatured?: boolean;
}

const PricingTierCard: React.FC<PricingTier> = ({
  title,
  seats,
  description,
  options,
  isFeatured,
  perSeat,
}) => {
  const [isAnnual, setIsAnnual] = React.useState(false);

  return (
    <div
      className={`bg-white rounded-3xl shadow-xl border overflow-hidden ${
        isFeatured ? "border-[#777CDC]" : "border-gray-100"
      }`}
    >
      <div className={`pt-10 pb-6 px-8 text-center bg-main text-white`}>
        <h3 className="text-2xl font-black mb-1">{title}</h3>
        <p className="text-white/80 text-sm mb-4">
          {seats} {typeof seats === "number" ? "seat" : "seats"}
        </p>
        <p className="text-white/60 text-xs mb-6">{description}</p>

        <div className="flex justify-center bg-white/10 rounded-lg p-1 w-fit mx-auto">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              !isAnnual ? "bg-white text-main" : "text-white/70"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              isAnnual ? "bg-white text-main" : "text-white/70"
            }`}
          >
            Annual
          </button>
        </div>

        <div className="text-3xl font-black mt-4">
          From $
          {isAnnual
            ? options
                .reduce((sum, opt) => {
                  const base = opt.annual;
                  const training = opt.addTraining ? opt.addTraining.annual : 0;
                  return sum + base + training;
                }, 0)
                .toFixed(2)
            : options
                .reduce((sum, opt) => {
                  const base = opt.monthly;
                  const training = opt.addTraining
                    ? opt.addTraining.monthly
                    : 0;
                  return sum + base + training;
                }, 0)
                .toFixed(2)}
          {perSeat ? "/seat" : `/${isAnnual ? "yr" : "mo"}`}
        </div>
      </div>

      <div className="p-8">
        <ul className="space-y-4">
          {options.map((option, idx) => {
            const basePrice = isAnnual ? option.annual : option.monthly;

            const trainingPrice = option.addTraining
              ? isAnnual
                ? option.addTraining.annual
                : option.addTraining.monthly
              : 0;

            const total = (basePrice + trainingPrice).toFixed(2);

            return (
              <li key={idx} className="bg-[#F3F6F9] rounded-2xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-[#464E5F]">
                    {option.name}
                  </span>

                  <div className="text-right">
                    <span className="text-xl font-black text-main">
                      ${total}
                    </span>
                    <span className="text-xs text-gray-500">
                      {perSeat ? "/seat" : `/${isAnnual ? "yr" : "mo"}`}
                    </span>
                  </div>
                </div>
                {/* 
                {option.addTraining && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Plus size={12} />
                    Add Training +$
                    {isAnnual
                      ? option.addTraining.annual
                      : option.addTraining.monthly}
                    {perSeat ? "/seat" : `/${isAnnual ? "yr" : "mo"}`}
                  </div>
                )} */}

                {idx === 1 && (
                  <div className="text-xs text-green-600 mt-2 font-medium">
                    Most Popular
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 pt-6 border-t border-[#EBEDF3]">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <CheckCircle2 size={18} className="text-green-500" />
            Email Support
          </div>

          <button
            className={`w-full py-4 rounded-xl font-bold transition-all bg-main text-white hover:bg-main/90 hover:cursor-pointer`}
          >
            {isFeatured ? "Upgrade Now" : "Get Started"}
          </button>
        </div>
      </div>
    </div>
  );
};

const PricingPlans: React.FC = () => {
  const navigate = useNavigate();

  const tiers: PricingTier[] = [
    {
      title: "Solo Pro",
      seats: 1,
      description: "Best for individuals",
      options: [
        {
          name: "Either HR or TA Agent",
          monthly: 39,
          annual: 390,
          addTraining: {
            monthly: 9.95,
            annual: 99.5,
          },
        },
        {
          name: "HR & TA Agent",
          monthly: 59,
          annual: 590,
          addTraining: {
            monthly: 9.95,
            annual: 99.5,
          },
        },
        // {
        //   name: "Training Only",
        //   monthly: 9.95,
        //   annual: 99.5,
        // },
      ],
    },
    {
      title: "Team Flex",
      seats: 5,
      description: "Best for small teams",
      isFeatured: true,
      options: [
        {
          name: "Either HR or TA Agent",
          monthly: 175,
          annual: 1750,
          addTraining: {
            monthly: 39.95,
            annual: 399.5,
          },
        },
        {
          name: "HR & TA Agent",
          monthly: 275,
          annual: 2750,
          addTraining: {
            monthly: 39.95,
            annual: 399.5,
          },
        },
        // {
        //   name: "Training Only",
        //   monthly: 39.95,
        //   annual: 399.5,
        // },
      ],
    },
    {
      title: "Enterprise+",
      seats: "6+",
      perSeat: true,
      description: "Best for large organizations",
      options: [
        {
          name: "Either HR or TA Agent",
          monthly: 29,
          annual: 290,
          addTraining: {
            monthly: 8.95,
            annual: 89.5,
          },
        },
        {
          name: "HR & TA Agent",
          monthly: 49,
          annual: 490,
          addTraining: {
            monthly: 8.95,
            annual: 89.5,
          },
        },
        // {
        //   name: "Training Only",
        //   monthly: 8.95,
        //   annual: 89.5,
        // },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <button
          onClick={() => navigate("/dashboard/profile")}
          className="flex items-center gap-1 text-[#8E99AF] hover:text-[#464E5F] transition-colors font-medium mb-4"
        >
          <ChevronLeft size={20} />
          <span>Back to Profile</span>
        </button>

        <div className="bg-white rounded-2xl border border-[#EBEDF3] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-[#464E5F]">
              Our Pricing Plans
            </h1>
            <p className="text-[#8E99AF] text-sm">All prices +GST</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFD7001A] rounded-lg flex items-center justify-center">
              <span className="text-xl">👑</span>
            </div>
            <p className="text-[#464E5F] font-medium">
              Solo Pro - HR & TA Agent{" "}
              <span className="text-main">(Current)</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <PricingTierCard key={idx} {...tier} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-[#EBEDF3] p-6 md:p-8 max-w-lg mx-auto">
            <h3 className="text-xl font-black text-[#464E5F] mb-2">
              Custom Agents
            </h3>
            <p className="text-[#8E99AF] text-sm mb-4">
              Please contact for pricing
            </p>

            <ul className="space-y-2 text-[#464E5F] text-sm mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-main" />
                Tailored Agents
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-main" />
                Locked Privacy Server
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-main" />
                Customised Knowledge Bank
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-main" />
                Integrations
              </li>
            </ul>

            <button className="px-6 py-3 rounded-xl font-bold bg-main text-white hover:bg-main/90 transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
