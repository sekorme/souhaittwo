// app/api/notify-user/route.ts (Next.js App Router API)
import { sendPushNotification } from "@/lib/sendNotification";

export async function POST(req: Request) {
    const { fcmToken, title, body } = await req.json();

    try {
        const response = await sendPushNotification(fcmToken, title, body);
        return Response.json({ success: true, response });
    } catch (err) {
        console.error("Notification failed:", err);
        return new Response("Failed to send", { status: 500 });
    }
}
