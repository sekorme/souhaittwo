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
        const { token } = await req.json();

        if (!token) {
            return NextResponse.json({ success: false, error: 'Token is required' }, { status: 400 });
        }

        // Save token as document ID for quick existence check
        await admin.firestore().collection('fcmTokens').doc(token).set({ createdAt: admin.firestore.FieldValue.serverTimestamp() });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Save token error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
