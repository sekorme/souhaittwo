"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import {useState, useRef, useEffect} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoSource = ["/small1.mp4", "/small.mp4", "/small2.mp4"];
    const videoRef = useRef<any>(null)

    const titles = [
        "Need help with your visa and job applications?",
        "We provide expert guidance and support to secure your future",
        "We are dedicated to helping you achieve your dreams"
    ]
    const handleVideoEnd = () => {
        setCurrentVideo((prevIndex) => (prevIndex + 1) % videoSource.length);
    };

    const handleNextVideo = () => {
        setCurrentVideo((prevIndex) => (prevIndex + 1) % videoSource.length);
    };

    const handlePrevVideo = () => {
        setCurrentVideo((prevIndex) =>
            prevIndex === 0 ? videoSource.length - 1 : prevIndex - 1
        );
    };
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videoSource[currentVideo]; // Update the video source
            videoRef.current.play(); // Ensure the video starts playing
        }
    }, [currentVideo]);
    return (
        <section className="relative  w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                ref={videoRef}
                autoPlay

                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                onEnded={handleVideoEnd}
            >
                <source src={videoSource[currentVideo]} type="video/mp4" />
            </video>

            {/* Overlay for a soft fade effect */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
                {/* Title Animation */}
                <motion.h1
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1}}
                    className="text-2xl md:text-4xl font-bold text-[#ff3d57]"
                >
                    Souhait Travel Advisors
                </motion.h1>
                <motion.h1
                    initial={{opacity: 0, y: -50}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 0.8}}
                    className="text-2xl md:text-4xl font-bold"
                >
                    {titles[currentVideo]}
                </motion.h1>

                {/* Subtitle Animation */}
                <motion.p
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, delay: 0.3}}
                    className="mt-4 text-lg md:text-xl max-w-2xl"
                >
                    Let Souhait Travel Advisors guide you towards a successful journey abroad with expert visa and job
                    consultation.
                </motion.p>

                {/* CTA Buttons with Fade-in Effect */}
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, delay: 0.6}}
                    className="mt-6 flex space-x-4"
                >
                    <Link href={"/sign-up"}>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
                            Get Started
                        </Button>
                    </Link>

                    <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full">
                        Learn More
                    </Button>
                </motion.div>
                <motion.div className={"hidden md:flex"}>
                    <motion.button
                        onClick={handlePrevVideo}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
                    >
                        <ChevronLeft className="w-8 h-8"/>
                    </motion.button>

                    <motion.button
                        onClick={handleNextVideo}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
                    >
                        <ChevronRight className="w-8 h-8"/>
                    </motion.button>
                </motion.div>
                <motion.div className={"sm:hidden mt-10 flex w-full items-center justify-between"}>
                    <motion.button
                        onClick={handlePrevVideo}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                        className="  bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
                    >
                        <ChevronLeft className="w-8 h-8"/>
                    </motion.button>

                    <motion.button
                        onClick={handleNextVideo}
                        whileHover={{scale: 1.2}}
                        whileTap={{scale: 0.9}}
                        className=" bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
                    >
                        <ChevronRight className="w-8 h-8"/>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
