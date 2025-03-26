import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
    const testimonials = [
        {
            quote:
                "Gain access to exclusive, hand-picked job opportunities in America, Europe, and Canada. Our jobs are from trusted and verified employers—no scams, no middlemen. Get regular updates on the latest job vacancies for subscribers.",
            name: "Verified Job Listings",
            designation: "Great Opportunities For You",
            src:"/images/job.jpg",
        },
        {
            quote:
                "Step-by-step guidance on visa application processes for work, study, and travel. We help you avoid common mistakes that lead to visa rejections. Receive personalized document checklists and embassy interview preparation.",
            name: "Visa Application Assistance",
            designation: "We guide you through the process",
            src: "/images/visa.jpg",
        },
        {
            quote:
                "We provide you with expert advice on housing, banking, and healthcare in your destination country. We educate you on legal guidance on residency permits and work regulations.",
            name: "Relocation & Settlement Support",
            designation: "We help you settle in a new country",
            src: "/images/better2.jpg",
        },
        {
            quote:
                "Personalized consultation with immigration experts. We provide you with expect advice on immigration matters such as job visas, student visas, family visas, permanent residency & citizenship applications.",
            name: "Exclusive Immigration Consultation.",
            designation: "We provide expert advice on immigration matters",
            src: "/images/immigration.jpg",
        }

    ];
    return <AnimatedTestimonials testimonials={testimonials} />;
}
