import { redirect } from "next/navigation";

import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import Appreciation from "@/components/Appreciation";
import Faqs from "@/components/Faqs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import { AnimatedTestimonialsDemo } from "@/components/AnimatedTes";
import { isAuthenticated } from "@/lib/actions/auth.actions";

export default async function Home() {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) redirect("/dashboard");

  return (
    <div className="h-full">
      <Hero />
      <WhyChooseUs />
      <Appreciation />
      <HowItWorks />
      <Testimonials />
      <AnimatedTestimonialsDemo />
      <Faqs />
    </div>
  );
}
