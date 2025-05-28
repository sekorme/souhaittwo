'use server';

import { db } from "@/firebase/client";
import {
    collection,
    doc,
    getDoc,
    updateDoc,
    increment,
    addDoc
} from "firebase/firestore";

export async function verifyTokenPayment({
                                             reference,
                                             userId,
                                             email,
                                             tokenAmount,
                                             price,
                                         }: {
    reference: string;
    userId: string;
    email: string;
    tokenAmount: number;
    price: number;
}) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
    });

    const result = await res.json();
    const data = result.data;

    if (data.status === "success") {
        // Update token balance
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) return { success: false };

        await updateDoc(userRef, {
            tokenBalance: increment(tokenAmount),
        });

        // Log the purchase
        await addDoc(collection(db, "token_purchases"), {
            userId,
            email,
            tokens: tokenAmount,
            amount: price,
            reference,
            purchasedAt: new Date(),
        });

        return { success: true };
    }

    return { success: false };
}
