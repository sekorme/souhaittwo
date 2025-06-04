'use client';

import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { doc, updateDoc } from "firebase/firestore";
import { db, getFirebaseMessaging } from "@/firebase/client";

export function useFCMToken(userId: any) {
    useEffect(() => {
        if (!userId) return; // early exit if no userId

        async function requestPermissionAndSaveToken() {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== "granted") {
                    console.log("Notification permission denied");
                    return;
                }

                const messaging = await getFirebaseMessaging();
                if (!messaging) {
                    console.log("Firebase messaging not supported");
                    return;
                }

                const currentToken = await getToken(messaging, {
                    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID!,
                });

                if (currentToken) {
                    console.log("FCM token:", currentToken);
                    // userId is guaranteed string here
                    const userDocRef = doc(db, "users", userId);
                    await updateDoc(userDocRef, { fcmToken: currentToken });
                } else {
                    console.log("No registration token available.");
                }

                const unsubscribe = onMessage(messaging, (payload) => {
                    console.log("Message received in foreground:", payload);
                });

                return () => unsubscribe();
            } catch (error) {
                console.error("Error getting FCM token:", error);
            }
        }

        requestPermissionAndSaveToken();
    }, [userId]);
}
