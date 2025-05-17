'use server';

import { db } from '@/firebase/client';
import {collection, deleteDoc, doc, getDoc, getDocs, query, where} from 'firebase/firestore';

export async function deleteInterviewById({
                                              interviewId,
                                              userId,
                                          }: {
    interviewId: string;
    userId: string;
}) {
    try {
        // Check the interview belongs to the user
        const interviewRef = doc(db, 'interviews', interviewId);
        const interviewSnap = await getDoc(interviewRef);

        if (!interviewSnap.exists() || interviewSnap.data()?.userId !== userId) {
            throw new Error('Unauthorized or interview not found.');
        }

        // Delete interview
        await deleteDoc(interviewRef);

        // Find and delete associated feedback
        const feedbackQuery = query(
            collection(db, 'feedback'),
            where('interviewId', '==', interviewId),
            where('userId', '==', userId)
        );

        const feedbackSnapshot = await getDocs(feedbackQuery);

        const deletePromises = feedbackSnapshot.docs.map((docSnap) =>
            deleteDoc(doc(db, 'feedback', docSnap.id))
        );

        await Promise.all(deletePromises);

        return { success: true };
    } catch (error: any) {
        console.error('Error deleting interview/feedback:', error);
        return { success: false, message: error.message };
    }
}
