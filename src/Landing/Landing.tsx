import { FeatureSection } from "./Sections/Features";
import Hero from "./Sections/Hero";
import { HowItWorks } from "./Sections/HowItWorks";
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
    </div>
  );
}
