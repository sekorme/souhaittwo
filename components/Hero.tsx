"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";


const Hero = () => {
    return (
        <section className="relative  w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="/small.mp4" type="video/mp4" />
            </video>

            {/* Overlay for a soft fade effect */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                {/* Title Animation */}
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-2xl md:text-4xl font-bold text-[#ff3d57]"
                >
                    Souhait Travel Advisors
                </motion.h1>
                <motion.h1
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl md:text-6xl font-bold"
        >
                    Explore Global Opportunities
                </motion.h1>

                {/* Subtitle Animation */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-4 text-lg md:text-xl max-w-2xl"
                >
                    Let Souhait Travel Advisors guide you towards a successful journey abroad with expert visa and job consultation.
                </motion.p>

                {/* CTA Buttons with Fade-in Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-6 flex space-x-4"
                >
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                        Get Started
                    </Button>
                    <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full">
                        Learn More
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
