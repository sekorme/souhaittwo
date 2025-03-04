
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThanksComponent from "@/components/Thanks";
import Appreciation from "@/components/Appreciation";
import Faqs from "@/components/Faqs";


export default function Home() {
  return (
    <div className="h-full">
    <Hero/>
      <WhyChooseUs/>
     <Appreciation/>
      <Faqs/>
    </div>
  );
}
