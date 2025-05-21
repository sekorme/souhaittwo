'use server';

import { db } from '@/firebase/client';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const getDurationInDays = (plan: string): number => {
    if (plan.toLowerCase().includes('1 month')) return 2 /(24 * 60);
    if (plan.toLowerCase().includes('3 month')) return 5 / (24 * 60);
    if (plan.toLowerCase().includes('1 year')) return 10 / (24 * 60);
    return 30;
};

export async function verifyPayment({ reference, userId, email, plan }: any) {
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
        },
    });

    const result = await res.json();
    const data = result.data;

    if (data.status === 'success') {
        const now = Timestamp.now();
        const duration = getDurationInDays(plan);
        const endDate = Timestamp.fromDate(new Date(Date.now() + duration * 86400000)); // ms/day

        // Save to payments collection
        await addDoc(collection(db, 'payments'), {
            userId,
            email,
            amount: data.amount / 100,
            plan,
            status: data.status,
            reference,
            paidAt: data.paid_at,
        });

        // Save to subscriptions collection
        await addDoc(collection(db, 'subscriptions'), {
            userId,
            plan,
            startDate: now,
            endDate,
            status: 'active',
            reference,
        });

        return { success: true };
    }

    return { success: false };
}
