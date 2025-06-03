import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export async function POST(req: Request) {
    try {
        const { title, body } = await req.json();

        if (!title || !body) {
            return NextResponse.json(
                { success: false, error: 'Title and body are required' },
                { status: 400 }
            );
        }

        const snapshot = await admin.firestore().collection('fcmTokens').get();
        const tokens = snapshot.docs.map((doc) => doc.id).filter(Boolean);

        if (tokens.length === 0) {
            return NextResponse.json(
                { success: false, error: 'No tokens found' },
                { status: 400 }
            );
        }

        // ✅ Correct method: sendMulticast
        const response = await admin.messaging().sendEachForMulticast({
            tokens,
            notification: {
                title,
                body,
            },
        });

        return NextResponse.json({ success: true, response });
    } catch (error: any) {
        console.error('Notification error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
