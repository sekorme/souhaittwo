import admin from "firebase-admin";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
        }),
    });
}

export async function sendPushNotification(fcmToken: string, title: string, body: string) {
    const message = {
        notification: { title, body },
        token: fcmToken,
    };

    const res = await admin.messaging().send(message);
    console.log("Notification sent:", res);
}
