'use client'
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {BorderBeam} from "@/components/magicui/border-beam";
import React from "react";

const subscriptionPlans = [
    {
        title: "1 Month Subscription",
        price: "$15",
        description: "Full access to all job listings for 1 month.",
        duration: "1 month",
        benefits: [
            "Access to all job listings",
            "Real-time job notifications",
            "Profile visibility to recruiters"
        ]
    },
    {
        title: "3 Months Subscription",
        price: "$39",
        description: "Enjoy premium access for 3 months and stay ahead.",
        duration: "3 months",
        benefits: [
            "Access to all job listings",
            "Priority job notifications",
            "Exclusive career advice content",
            "Profile visibility to recruiters"
        ]
    },
    {
        title: "1 Year Subscription",
        price: "$99",
        description: "Best value: full-year access to thousands of jobs.",
        duration: "12 months",
        benefits: [
            "Access to all job listings",
            "Priority and early job alerts",
            "Exclusive career coaching sessions",
            "Discounts on visa consultation services",
            "Profile visibility to recruiters"
        ]
    },
];

export default function SubscriptionPlans() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-blue-100">
            <motion.h1
                className="text-4xl font-bold mb-10 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Choose Your Souhait Job Subscription
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {subscriptionPlans.map((plan, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                    >
                        <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all">
                            <CardContent className="flex flex-col items-center text-center p-6">
                                <h2 className="text-2xl font-semibold mb-4">{plan.title}</h2>
                                <p className="text-4xl font-bold text-blue-600 mb-4">{plan.price}</p>
                                <p className="text-gray-600 mb-6">{plan.description}</p>
                                <ul className="text-left mb-6 space-y-2">
                                    {plan.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-center">
                                            <span className="mr-2 text-blue-500">✔</span> {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="w-full">Subscribe Now</Button>
                                <BorderBeam
                                    duration={6}
                                    size={400}
                                    className="from-transparent via-amber-500 to-transparent"
                                />
                                <BorderBeam
                                    duration={6}
                                    delay={3}
                                    size={400}
                                    className="from-transparent via-blue-500 to-transparent"
                                />
                            </CardContent>

                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
