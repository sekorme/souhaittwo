"use client";

import React from "react";
import { motion } from "framer-motion";
import {Image} from "@heroui/react";

const variant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

const images = [
    { src: "/images/hiro.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro1.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro2.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro13.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro4.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro5.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro12.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro8.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro9.jpg", alt: "Souhait Logo" },
    { src: "/images/hiro11.jpg", alt: "Souhait Logo" },
];

const ThanksComponent = () => {
    return (
        <div className="w-full mx-auto p-2 py-8 text-center">
            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-500 mb-6">We Trust Souhait</h3>

            {/* Image Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        variants={variant}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.15, ease: "easeInOut", duration: 0.9 }}
                        viewport={{ once: true }}
                        className=" shadow-lg  rounded-xl "
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            width={400}
                            height={200}
                            className="w-full rounded-xl"
                             // Prioritize loading first 3 images
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ThanksComponent;
