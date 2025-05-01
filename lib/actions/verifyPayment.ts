'use server';

import { db } from '@/firebase/client';
import { collection, addDoc } from 'firebase/firestore';

export async function verifyPayment({ reference, userId, email, plan }: any) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
    });

    const result = await res.json();
    const data = result.data;

    if (data.status === 'success') {
        await addDoc(collection(db, 'payments'), {
            userId,
            email,
            amount: data.amount / 100,
            plan,
            status: data.status,
            reference,
            paidAt: data.paid_at,
        });

        return { success: true };
    }

    return { success: false };
}
