import {
    collection,
    query,
    where,
    getDocs,
    addDoc,
    updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/client";

export async function checkAndNotifySubscription(userId: string) {
    if (!userId) return;

    const now = new Date();

    const q = query(
        collection(db, "subscriptions"),
        where("userId", "==", userId),
        where("status", "==", "active")
    );

    const snapshot = await getDocs(q);
    const sub = snapshot.docs[0];
    if (!sub) return;

    const subData = sub.data();
    const end =
        typeof subData.endDate.toDate === "function"
            ? subData.endDate.toDate()
            : new Date(subData.endDate);

    if (end < now) {
        await updateDoc(sub.ref, { status: "expired" });

        const notifyQuery = query(
            collection(db, "notifications"),
            where("userId", "==", userId),
            where("type", "==", "subscription"),
            where("read", "==", false)
        );

        const notified = await getDocs(notifyQuery);
        if (notified.empty) {
            await addDoc(collection(db, "notifications"), {
                userId,
                type: "subscription",
                title: "Subscription Expired",
                message: `Your subscription expired on ${end.toLocaleDateString()}. Renew to regain access.`,
                read: false,
                createdAt: new Date(),
            });
        }
    }
}
