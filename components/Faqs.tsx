'use client'
import React from 'react'
import {Accordion, AccordionItem} from "@heroui/react";

const Faqs = () => {
    const defaultContent =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const faqs = [
        {
            question: "Do I need to go through an agent to apply for a visa?",
            answer:
                "No! We empower you to apply directly, avoiding extra charges from middlemen.",
        },
        {
            question: "How can I access job listings?",
            answer: "Subscribe to our job portal to unlock verified job opportunities.",
        },
        {
            question: "Can you guarantee visa approval?",
            answer:
                "No one can guarantee approval, but our expertise significantly improves your chances.",
        },
        {
            question: "How do I book a consultation?",
            answer: "Click on our Consultation Booking page and schedule an appointment.",
        },
        {
            question: "What documents do I need for a visa application?",
            answer:
                "Required documents vary by country and visa type but typically include a valid passport, proof of funds, job offer (if applicable), and other supporting documents. We provide detailed guidance for each case.",
        },
        {
            question: "How long does the visa application process take?",
            answer:
                "Processing times depend on the country and visa type. We help you submit a complete application to avoid delays.",
        },
        {
            question: "Do you provide travel itinerary services?",
            answer:
                "Yes, we assist in planning a structured travel itinerary to strengthen your visa application.",
        },
    ];

    return (
        <div className={"py-10 px-5 "}>
            <div className={"flex flex-col items-center justify-center"}>
                <h1 className="text-2xl text-center font-bold text-gray-500 mb-6 p-4">Frequently Asked Questions</h1>
            </div>
        <Accordion variant="splitted">
            {
                faqs.map((data, index) =>(
                    <AccordionItem key={index} aria-label="Accordion 1" title={data.question}>
                     <p className={"text-[#00D346] italic md:text-sm"}>   {data.answer}</p>
                    </AccordionItem>
                ))
            }

        </Accordion>
            </div>
    );

}
export default Faqs
