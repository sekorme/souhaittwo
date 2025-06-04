import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const { token, title, body } = await req.json();

    const message = {
        to: token,
        notification: {
            title,
            body,
        },
    };

    try {
        const res = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: 'POST',
            headers: {
                'Authorization': `key=${process.env.FCM_SERVER_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

        const data = await res.json();
        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('FCM Send Error:', err);
        return NextResponse.json({ success: false, error: 'Failed to send' }, { status: 500 });
    }
}
