import { FAQSection } from "./Sections/FaqSection";
import { FeatureSection } from "./Sections/Features";
import { Footer } from "./Sections/Footer";
import Hero from "./Sections/Hero";
import { HowItWorks } from "./Sections/HowItWorks";
import { PricingPlans } from "./Sections/PricingPlan";
import { TestimonialSection } from "./Sections/Testimonials";
import WhatWedo from "./Sections/WhatWedo";
import { WhyChooseUs } from "./Sections/WhyUs";

export default function Landing() {
  return (
    <div className="">
      <Hero />
      <WhatWedo />
      <FeatureSection />
      <HowItWorks />
      <WhyChooseUs />
      <PricingPlans />
      <TestimonialSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
