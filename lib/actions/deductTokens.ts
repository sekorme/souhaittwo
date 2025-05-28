import { db } from "@/firebase/client";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export async function deductTokens(userId: string, requiredTokens: number ) {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    const user = snap.data();

    if (!user || (user.tokenBalance || 0) < requiredTokens) {
        throw new Error("Insufficient tokens");
    }

    await updateDoc(userRef, {
        tokenBalance: increment(-requiredTokens),
    });

    return { success: true };
}
