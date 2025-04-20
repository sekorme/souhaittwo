"use client";

import { motion } from "framer-motion";
import { CheckCircle, Globe, Users, ShieldCheck } from "lucide-react";

const features = [
    {
        icon: <Globe size={40} className="text-blue-500" />,
        title: "Global Expertise",
        description: "We specialize in visa and job consultation for USA, Canada, and Europe.",
    },
    {
        icon: <ShieldCheck size={40} className="text-green-500" />,
        title: "Secure & Reliable",
        description: "100% transparent process with no hidden charges or middlemen.",
    },
    {
        icon: <Users size={40} className="text-purple-500" />,
        title: "Personalized Guidance",
        description: "One-on-one consultation to maximize your visa approval chances.",
    },
    {
        icon: <CheckCircle size={40} className="text-orange-500" />,
        title: "High Success Rate",
        description: "We provide expert strategies to increase your visa approval odds.",
    },
];

// Bounce animation for icons
const bounceVariants = {
    animate: (i: number) => ({
        y: [0, -10, 0],
        transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
        },
    }),
};

// Fade-in for card content
const fadeInItem = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.5 + i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const WhyChooseUs = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="py-16"
        >
            <div className="max-w-6xl mx-auto text-center px-6">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold dark:text-white text-gray-800 mb-6"
                >
                    Why Choose{" "}
                    <span className="text-[#ff3d57]">Souhait Travel Advisors?</span>
                </motion.h2>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-gray-400 text-lg mb-12"
                >
                    We make your dreams of working and traveling abroad a reality with
                    affordable, expert consultation.
                </motion.p>

                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            custom={index}
                            variants={fadeInItem}
                            viewport={{ once: true, amount: 0.2 }}
                            className="p-6 rounded-2xl shadow-md dark:bg-neutral-800 hover:shadow-xl transition-all cursor-pointer border-t-4 border-[#00d748]"
                        >
                            {/* Bouncing Icon */}
                            <motion.div
                                custom={index}
                                variants={bounceVariants}
                                animate="animate"
                                className="flex justify-center"
                            >
                                {feature.icon}
                            </motion.div>

                            {/* Title Fade */}
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                                className="text-xl font-semibold dark:text-white text-gray-700 mt-4"
                            >
                                {feature.title}
                            </motion.h3>

                            {/* Description Fade */}
                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                                className="text-gray-500 mt-2"
                            >
                                {feature.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default WhyChooseUs;
