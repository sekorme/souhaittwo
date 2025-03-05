"use client";

import { motion } from "framer-motion";
import { ClipboardList, UserCheck, Briefcase, CheckCircle } from "lucide-react";

const steps = [
    {
        icon: <ClipboardList size={40} className="text-blue-500" />,
        title: "Register & Subscribe",
        description: "Create an account and subscribe to access job offers and visa consultations.",
    },
    {
        icon: <UserCheck size={40} className="text-green-500" />,
        title: "Book a Consultation",
        description: "Schedule a one-on-one consultation for expert guidance on visa applications.",
    },
    {
        icon: <Briefcase size={40} className="text-purple-500" />,
        title: "Find & Apply for Jobs",
        description: "Browse verified job opportunities and apply directly to international employers.",
    },
    {
        icon: <CheckCircle size={40} className="text-orange-500" />,
        title: "Secure Your Future",
        description: "Get visa approval with our expert strategies and start your journey abroad.",
    },
];

const bounceVariants = {
    animate: (i: number) => ({
        y: [0, -15, 0], // Move up and down
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2, // Creates a wave effect
        },
    }),
};

const HowItWorks = () => {
    return (
        <section className="py-16">
            <div className="max-w-6xl mx-auto text-center px-6">

                {/* Title Animation */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 mb-6"
                >
                    How It <span className="text-[#00d346]">Works</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-500 text-lg mb-12"
                >
                    Follow these simple steps to start your journey abroad with Souhait Travel Advisors.
                </motion.p>

                {/* Bouncing Steps */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={bounceVariants}
                            animate="animate"
                            custom={index}
                            className="dark:bg-neutral-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border-t-4 border-[#ff3d57]"
                        >
                            <div className="flex justify-center">{step.icon}</div>
                            <h3 className="text-xl font-semibold dark:text-white text-gray-700 mt-4">{step.title}</h3>
                            <p className="text-gray-500 mt-2">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
