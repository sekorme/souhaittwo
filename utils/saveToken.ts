import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '@/lib/firebase';

const db = getFirestore(app);

export const saveTokenToFirestore = async (userId :any, token:any) => {
    try {
        await setDoc(doc(db, 'fcmTokens', userId), {
            token,
            updatedAt: new Date().toISOString()
        });
        console.log('FCM token saved to Firestore');
    } catch (error) {
        console.error('Error saving token to Firestore:', error);
    }
};
