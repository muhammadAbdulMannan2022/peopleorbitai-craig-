import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={`group border-b border-gray-100 bg-white transition-all duration-300 rounded-2xl  ${
        isOpen ? "bg-slate-50/50 rounded-2xl px-6" : "px-2"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full py-7 flex items-center justify-between text-left focus:outline-none hover:cursor-pointer"
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg md:text-xl font-bold transition-colors duration-300 ${
            isOpen ? "text-[#818cf8]" : "text-title-2nd  px-3"
          }`}
        >
          {question}
        </span>
        <div
          className={`shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-[#818cf8] text-white rotate-180"
              : "bg-slate-100 text-slate-400"
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-8" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-500 leading-relaxed text-base md:text-lg max-w-2xl">
          {answer}
        </p>
      </div>
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "What does PeopleOrbitAI actually do?",
      answer:
        "We help TA and HR teams turn AI into outcomes: we consult on your current state, train your people, and deploy personal AI agents (Finn & Nell) that produce ready-to-use work safely and at speed.",
    },
    {
      question: "Which parts are subscription-based?",
      answer:
        "AI Agents are offered on subscription plans with tiered usage and team options. Our AI Consulting is a scoped project (fixed-fee or milestone-based) to set your roadmap before you scale. Our AI Training is tailored to your needs.",
    },
    {
      question:
        "Do we need the AI-Readiness Consult before investing in training or agents?",
      answer:
        "Strongly recommended. The AI audit benchmarks your AI-readiness, clarifies risks, and sequences quick wins so training and agents land cleanly, with governance and ROI baked in. If timing is tight, we can run a mini-assessment first.",
    },
    {
      question: "Can we customise our training and agents?",
      answer:
        "Yes, please reach out directly to discuss your needs and we can put together a solution that works.",
    },
    {
      question: "How long does agent onboarding take?",
      answer:
        "Most teams go live in 2–4 weeks: week 1 for setup and guardrails, weeks 2–3 for pilot training and templates, then expand users and use-cases. We keep it lightweight and aligned to your BAU rhythms.",
    },
    {
      question: "Is our data secure and compliant?",
      answer:
        "Yes. We operate with strong privacy controls, role-based access, and audit trails, aligned to Australian Privacy Principles and enterprise expectations. You retain ownership of your data and outputs; we don’t use your content to train public models.",
    },
    {
      question: "How do Finn (HR) and Nell (TA) fit into our workflow?",
      answer:
        "They sit beside your team to draft policies, letters, JDs, ads, interview guides, Boolean searches, and communications—then file, format, and follow your templates. They learn your tone and cut admin, not corners.",
    },
    {
      question: "How is pricing structured?",
      answer:
        "Subscriptions are tiered for team size and usage, with discounts for annual commitments. The Consult & Training is a separate project fee. We’ll recommend the leanest plan that meets your outcomes.",
    },
    {
      question: "What support do we get?",
      answer:
        "You’ll have access to customer success, a help centre, and prompt clinics. For larger teams, we include admin enablement, quarterly optimisation reviews, and optional SLAs for faster response times.",
    },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(faqs.length - 1);

  // Split FAQs into two columns to prevent height-sync issues in a single grid row
  const half = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, half);
  const rightColumnFaqs = faqs.slice(half);

  return (
    <section
      id="faq"
      className="py-24 px-6 md:px-16 bg-[#fafafa] bg-[url('/faqbg.png')] bg-cover bg-center"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black text-title-2nd mb-6 tracking-tight">
            FAQ's
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Here are the answers to the most frequently asked questions. If you
            can't find what you are looking for, please contact us directly.
          </p>
        </div>

        {/* 2-Column Grid with independent vertical stacks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 items-start">
          {/* Left Column Stack */}
          <div className="flex flex-col gap-2">
            {leftColumnFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>

          {/* Right Column Stack */}
          <div className="flex flex-col gap-2">
            {rightColumnFaqs.map((faq, index) => {
              const actualIndex = index + half;
              return (
                <FAQItem
                  key={actualIndex}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === actualIndex}
                  onToggle={() =>
                    setOpenIndex(openIndex === actualIndex ? null : actualIndex)
                  }
                />
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-slate-500 mb-6">Still have questions?</p>
          <button className="px-8 py-4 bg-[#1a1a2e] text-white font-bold rounded-full hover:bg-indigo-600 transition-colors shadow-lg active:scale-95">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};
