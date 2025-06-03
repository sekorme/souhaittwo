// lib/notifications.ts
import { getFirebaseMessaging } from "@/firebase/client"
import { getToken, onMessage } from "firebase/messaging"

export async function requestPermissionAndGetToken() {
    try {
        const messaging = await getFirebaseMessaging()
        if (!messaging) return null

        const permission = await Notification.requestPermission()
        if (permission !== "granted") {
            console.warn("Permission not granted")
            return null
        }

        const token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID!, // Found in Firebase Console > Cloud Messaging
        })

        console.log("FCM Token:", token)
        return token
    } catch (error) {
        console.error("Error getting FCM token:", error)
        return null
    }
}

export function onMessageListener() {
    return new Promise((resolve) => {
        getFirebaseMessaging().then((messaging) => {
            if (messaging) {
                onMessage(messaging, (payload) => {
                    resolve(payload)
                })
            }
        })
    })
}
