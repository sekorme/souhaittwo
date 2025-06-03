'use client';

import { useEffect } from 'react';
import { messaging, firebaseOnMessage } from '@/lib/firebase';
import { getToken } from 'firebase/messaging';

export default function NotificationSetup() {
    useEffect(() => {
        async function setup() {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') return;

            const registration = await navigator.serviceWorker.ready;

            const token = await getToken(messaging, {
                vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID!,
                serviceWorkerRegistration: registration,
            });

            if (token) {
                console.log('FCM Token:', token);

                await fetch('/api/save-token', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token }),
                });
            }

            firebaseOnMessage(messaging, (payload) => {
                alert(`${payload.notification?.title}: ${payload.notification?.body}`);
            });
        }

        setup();
    }, []);

    return null;
}
