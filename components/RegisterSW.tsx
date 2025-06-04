'use client';

import { useEffect } from "react";

export function RegisterSW() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/firebase-messaging-sw.js")
                .then((registration) => {
                    console.log("SW Registered", registration);
                })
                .catch((error) => {
                    console.error("SW Registration Failed", error);
                });
        }
    }, []);

    return null;
}
