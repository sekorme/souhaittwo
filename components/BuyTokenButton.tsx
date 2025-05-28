'use client';

import PaystackPop from "@paystack/inline-js";
import { toast } from "react-hot-toast";
import { verifyTokenPayment } from "@/lib/actions/verifyTokenPayment";
import { Button } from "@/components/ui/button";
import {verifyPayment} from "@/lib/actions/verifyPayment";
import {addToast} from "@heroui/toast";
import {CircleCheck} from "lucide-react";
import React from "react";

export default function BuyTokensButton({
                                            userId,
                                            email,
                                            tokenAmount,
                                            price,
                                        }: {
    userId: string;
    email: string;
    tokenAmount: number;
    price: number;
}) {
    const handlePayment = () => {
        const paystack = new PaystackPop();
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        paystack.newTransaction({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
            email,
            amount: price * 100,
            metadata: {
                custom_fields: [
                    { display_name: "Token Amount", variable_name: "tokens", value: tokenAmount }
                ],
            },
            //@ts-ignore
            callback: async function (response: any) {
                // verify with server action
                const verified = await verifyTokenPayment({
                    reference: response.reference,
                    userId,
                    email,
                    tokenAmount,
                    price
                });

                if (verified.success) {
                    addToast({
                        title: "TOKEN PURCHASE SUCCESSFUL",
                        icon: <CircleCheck  />,
                        color: "success",

                        description:
                            "Your payment was successful. You can now access the paid services.",
                    });
                    window.location.reload()
                } else {
                    alert("Payment Failed.");
                }
            },
            onClose: function () {
                addToast({
                    title: "PAYMENT CLOSED",
                    icon: <CircleCheck  />,
                    color: "warning",
                    description:
                        "You closed the payment window. Please try again.",
                });
            },
        });
    };

    return (
        <Button onClick={handlePayment} className="bg-black text-white">
            Buy {tokenAmount} Tokens for ${price}
        </Button>
    );
}
