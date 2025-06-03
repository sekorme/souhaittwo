import { NextResponse } from 'next/server';
import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
    });
}

export async function POST(req: Request) {
    try {
        const { token, title, body } = await req.json();

        const message = {
            token,
            notification: {
                title,
                body,
            },
        };

        const response = await admin.messaging().send(message);

        return NextResponse.json({ success: true, response });
    } catch (error: any) {
        console.error('FCM Send Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
