import { FeatureSection } from "./Sections/Features";
import Hero from "./Sections/Hero";
import WhatWedo from "./Sections/WhatWedo";

export default function Landing() {
  return (
    <div className="">
      <Hero />
      <WhatWedo />
      <FeatureSection />
    </div>
  );
}
