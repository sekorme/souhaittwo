import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { tokens, title, body } = await req.json();

    const message = {
        registration_ids: tokens,
        notification: {
            title,
            body,
        },
    };

    try {
        const res = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                Authorization: `key=${process.env.FCM_SERVER_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const data = await res.json();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('FCM Bulk Send Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to send bulk notification' }, { status: 500 });
    }
}
