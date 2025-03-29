"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoSource = ["/small1.mp4", "/small.mp4", "/small2.mp4"];
  const videoRef = useRef<any>(null);

  const titles = [
    "Need help with your visa and job applications?",
    "We provide expert guidance and support to secure your future",
    "We are dedicated to helping you achieve your dreams",
  ];

  const description = [
    "Navigating the complexities of visa applications and securing the right job abroad can be overwhelming. Let our experienced team of experts guide you every step of the way",
    "Your future abroad starts with the right guidance. Our team of specialists is committed to helping you with visa applications, job searches, and all the necessary steps to secure your place in a new country.",
    "At Souhait Travel Advisors, we believe that every dream is achievable with the right support. Whether you’re looking to advance your career, start a new life, or pursue educational opportunities abroad, our team is dedicated to helping you make it happen. ",
  ];
  const handleVideoEnd = () => {
    setCurrentVideo((prevIndex) => (prevIndex + 1) % videoSource.length);
  };

  const handleNextVideo = () => {
    setCurrentVideo((prevIndex) => (prevIndex + 1) % videoSource.length);
  };

  const handlePrevVideo = () => {
    setCurrentVideo((prevIndex) =>
      prevIndex === 0 ? videoSource.length - 1 : prevIndex - 1,
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
      <div className="absolute inset-0 bg-black/50" />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        {/* Title Animation */}
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold text-[#ff3d57]"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1 }}
        >
          Souhait Travel Advisors
        </motion.h1>
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {titles[currentVideo]}
        </motion.h1>

        {/* Subtitle Animation */}
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm md:text-xl max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {description[currentVideo]}
        </motion.p>

        {/* CTA Buttons with Fade-in Effect */}
        <motion.div
          animate={{ opacity: 1 }}
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >

            <Button as={Link} href={"/sign-up"} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
              Get Started
            </Button>


          <Button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-full">
            Learn More
          </Button>
        </motion.div>
        <motion.div className={"hidden md:flex"}>
          <motion.button
            className="absolute left-4 top-1/2  bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevVideo}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          <motion.button
            className="absolute right-4 top-1/2  bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextVideo}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </motion.div>
        <motion.div
          className={"sm:hidden mt-10 flex w-full items-center justify-between"}
        >
          <motion.button
            className="  bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevVideo}
          >
            <ChevronLeft className="w-8 h-8" />
          </motion.button>

          <motion.button
            className=" bg-white/30 hover:bg-white/50 text-white p-3 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextVideo}
          >
            <ChevronRight className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
