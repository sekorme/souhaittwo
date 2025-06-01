import { db } from "@/firebase/client" // your initialized Firestore instance
import { doc, getDoc } from "firebase/firestore"

export async function getInterviewByIdFromFirestore(interviewId: string) {
    const docRef = doc(db, "interviews", interviewId)
    const snap = await getDoc(docRef)
    return snap.exists() ? snap.data() : null
}

export async function getFeedbackByInterviewIdFromFirestore(interviewId: string, userId: string) {
    const docRef = doc(db, "feedback", `${interviewId}_${userId}`)
    const snap = await getDoc(docRef)
    return snap.exists() ? snap.data() : null
}
