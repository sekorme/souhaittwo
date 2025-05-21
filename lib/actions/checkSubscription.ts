import { db } from "@/firebase/client";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function isSubscribed(userId: string) {
    const snapshot = await getDocs(
        query(
            collection(db, "subscriptions"),
            where("userId", "==", userId)
        )
    );

    const now = new Date();
    const activeSub = snapshot.docs
        .map((doc) => doc.data())
        .find((sub) => {
            const end = sub.endDate?.toDate?.() || new Date(sub.endDate);
            return end > now;
        });

    return !!activeSub;
}
