"use client";

import React from "react";
import { Button } from "@heroui/react";

export default function BuyTokenCard({
                                         tokens,
                                         price,

                                     }: {
    tokens: number;
    price: number;

}) {
    return (
        <div className="rounded-xl shadow-md bg-white dark:bg-neutral-800 p-6  w-full hover:shadow-lg transition">
            <div className="text-center">
                <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {tokens} Tokens
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Use tokens to access mock interviews, document reviews, and AI tools.
                </p>
                <div className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
                    GHS {price.toFixed(2)}
                </div>
                <Button

                    className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Buy Now
                </Button>
            </div>
        </div>
    );
}
