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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Typically, orders are processed within 2-3 business days. Delivery times vary based on your location but usually range from 5 to 10 business days for most furniture items.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. The product must be in its original condition and packaging. Please note that custom-made items are non-refundable.",
    },
    {
      question: "Are your materials sustainably sourced?",
      answer:
        "Yes, we are committed to sustainability. Our wood comes from FSC-certified forests, and we use recycled metals and eco-friendly fabrics wherever possible.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we ship to over 25 countries across North America, Europe, and Asia. Shipping costs and delivery times will be calculated at checkout based on your address.",
    },
    {
      question: "How do I care for my furniture?",
      answer:
        "Each piece comes with a specific care guide. Generally, we recommend avoiding direct sunlight, using coasters for drinks, and dusting regularly with a soft, lint-free cloth.",
    },
    {
      question: "Can I customize the fabric or finish?",
      answer:
        "Many of our collections offer customization options for upholstery and wood finishes. Look for the 'Customize' button on the product page or contact our design team.",
    },
    {
      question: "Is assembly required for the furniture?",
      answer:
        "Most of our large items come pre-assembled or with minimal assembly required. For items needing assembly, clear instructions and tools are provided in the box.",
    },
    {
      question: "Do you have a physical showroom?",
      answer:
        "We have flagship showrooms in London, New York, and Tokyo. You can find their addresses and opening hours on our 'Locations' page.",
    },
  ];

  // Split FAQs into two columns to prevent height-sync issues in a single grid row
  const half = Math.ceil(faqs.length / 2);
  const leftColumnFaqs = faqs.slice(0, half);
  const rightColumnFaqs = faqs.slice(half);

  return (
    <section className="py-24 px-6 md:px-16 bg-[#fafafa] bg-[url('/faqbg.png')] bg-cover bg-center">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[#818cf8] font-bold text-sm tracking-widest uppercase mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-title-2nd mb-6 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Everything you need to know about our products, shipping, and
            sustainable craftsmanship.
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
