import { db } from "@/firebase/client";
import { doc, updateDoc } from "firebase/firestore";

export async function markNotificationAsRead(notificationId: string) {
    const notificationRef = doc(db, "notifications", notificationId);
    await updateDoc(notificationRef, { read: true });
}
