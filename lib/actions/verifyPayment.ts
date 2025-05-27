'use server';

        import { db } from '@/firebase/client';
        import { collection, addDoc, Timestamp } from 'firebase/firestore';

        /**
         * Calculates the duration of a subscription plan in days.
         *
         * @param {string} plan - The subscription plan (e.g., '1 month', '3 month', '1 year').
         * @returns {number} The duration of the plan in days. Defaults to 30 days if the plan is unrecognized.
         */
        const getDurationInDays = (plan: string): number => {
            if (plan.toLowerCase().includes('1 month')) return 30;
            if (plan.toLowerCase().includes('3 month')) return 90;
            if (plan.toLowerCase().includes('1 year')) return 365;
            return 30;
        };

        /**
         * Verifies a payment using the Paystack API and updates Firestore with payment and subscription details.
         *
         * @async
         * @param {Object} params - The parameters for payment verification.
         * @param {string} params.reference - The payment reference from Paystack.
         * @param {string} params.userId - The ID of the user making the payment.
         * @param {string} params.email - The email of the user making the payment.
         * @param {string} params.plan - The subscription plan selected by the user.
         * @returns {Promise<Object>} An object indicating the success or failure of the verification.
         */
        export async function verifyPayment({ reference, userId, email, plan }: any) {
            // Fetch payment verification details from Paystack API
            const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
                },
            });

            // Parse the response and extract the data
            const result = await res.json();
            const data = result.data;

            // Check if the payment was successful
            if (data.status === 'success') {
                const now = Timestamp.now(); // Current timestamp
                const duration = getDurationInDays(plan); // Calculate subscription duration
                const endDate = Timestamp.fromDate(new Date(Date.now() + duration * 86400000)); // Calculate end date

                // Save payment details to the 'payments' collection in Firestore
                await addDoc(collection(db, 'payments'), {
                    userId,
                    email,
                    amount: data.amount / 100, // Convert amount from kobo to naira
                    plan,
                    status: data.status,
                    reference,
                    paidAt: data.paid_at, // Payment timestamp from Paystack
                });

                // Save subscription details to the 'subscriptions' collection in Firestore
                await addDoc(collection(db, 'subscriptions'), {
                    userId,
                    plan,
                    startDate: now, // Subscription start date
                    endDate, // Subscription end date
                    status: 'active', // Subscription status
                    reference,
                });

                // Return success response
                return { success: true };
            }

            // Return failure response if payment was not successful
            return { success: false };
        }