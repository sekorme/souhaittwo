"use client";

import PaystackPop from "@paystack/inline-js";

import { verifyPayment } from "@/lib/actions/verifyPayment";
import {Button} from "@heroui/react";
import {addToast} from "@heroui/toast";
import {CircleCheck} from "lucide-react";
import React from "react";

export default function PaystackButton({
  email,
  amount,
  userId,
  plan,
}: {
  email: string;
  amount: number;
  userId: string;
  plan: string;
}) {
  const handlePay = () => {
    const paystack = new PaystackPop();

    // @ts-ignore
      // @ts-ignore
      paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      email,
      amount: amount * 100,
      currency: "GHS",
      metadata: {
        custom_fields: [
          {
            display_name: "Plan",
            variable_name: "plan",
            value: plan,
          },
        ],
      },
          //@ts-ignore
      callback: async function (response: any) {
        // verify with server action
        const verified = await verifyPayment({
          reference: response.reference,
          userId,
          email,
          plan,
        });

        if (verified.success) {
            addToast({
                title: "PAYMENT SUCCESSFUL",
                icon: <CircleCheck  />,
                color: "success",

                description:
                    "Your payment was successful. You can now access the paid services.",
            });
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
    <Button className="w-full bg-black text-white dark:text-black dark:bg-white" onPress={handlePay}>
      Pay Now
    </Button>
  );
}
