
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";

import Appreciation from "@/components/Appreciation";
import Faqs from "@/components/Faqs";
import HowItWorks from "@/components/HowItWorks";
import {getCurrentUser} from "@/lib/actions/users.actions";
import {redirect} from "next/navigation";
import Testimonials from "@/components/Testimonials";
import {AnimatedTestimonialsDemo} from "@/components/AnimatedTes";


export default async function Home() {
    const currentUser = await getCurrentUser();
    if (currentUser) return redirect("/dashboard");
  return (
    <div className="h-full">
    <Hero/>
      <WhyChooseUs/>
     <Appreciation/>
        <HowItWorks/>
        <Testimonials/>
        <AnimatedTestimonialsDemo/>
      <Faqs/>
    </div>
  );
}
