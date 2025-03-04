'use client'
import React from 'react'
import {Card, CardBody, CardFooter, Image} from "@heroui/react";
import {motion} from "framer-motion";


const images = [
    { src: "/images/hiro.jpg", alt: "Souhait makes it easy 🤩" },
    { src: "/images/hiro1.jpg", alt: "Who doesn't love Paris ❤️" },
    { src: "/images/hiro2.jpg", alt: "We love Souhait 🥰" },
    { src: "/images/hiro13.jpg", alt: "Souhait got you 😎" },
    { src: "/images/hiro4.jpg", alt: "My wish, My Souhait 🤜🏼" },
    { src: "/images/hiro5.jpg", alt: "When wish meets reality 🎉" },
    { src: "/images/hiro12.jpg", alt: "That feeling .. 🤪" },
    { src: "/images/hiro8.jpg", alt: "The Souhait vibe ☺️" },
    { src: "/images/hiro9.jpg", alt: "A dream come true 🥳" },
    { src: "/images/hiro11.jpg", alt: "Spend less, travel more. 🫶🏾" },
];


const Appreciation = () => {
    return (
        <div className={"px-4 py-10 bg-gray-200 dark:bg-neutral-900  rounded-2xl"}>
            <div className={"mb-10 px-5"}>
                <h1 className={"font-bold text-2xl text-default-400"}>Souhait simply means <span className={"text-[#00d346]"}>Wish</span></h1>
                <p className={"italic text-[#00d346]"}>Your wish, our desire to make it come true</p>
            </div>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {images.map((item, index) => (
                /* eslint-disable no-console */
                <Card key={index} isPressable shadow="sm" onPress={() => console.log("item pressed")}>
                    <CardBody className="overflow-visible p-0">
                        <Image
                            alt={item.alt}
                            className="w-full object-cover h-[240px]"
                            radius="lg"
                            shadow="sm"
                            src={item.src}
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="text-small justify-between">
                        <p className={"text-xs text-default-400"}>{item.alt}</p>
                        <p className="text-default-500">{""}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
        </div>
    );
}
export default Appreciation
