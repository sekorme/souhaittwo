
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";

import Appreciation from "@/components/Appreciation";
import Faqs from "@/components/Faqs";
import HowItWorks from "@/components/HowItWorks";


export default function Home() {
  return (
    <div className="h-full">
    <Hero/>
      <WhyChooseUs/>
     <Appreciation/>
        <HowItWorks/>
      <Faqs/>
    </div>
  );
}
