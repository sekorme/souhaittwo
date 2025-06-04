// public/firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "YOUR_PUBLIC_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
});

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
    console.log("📥 Received background message ", payload);

    const { title, body } = payload.notification;

    const notificationOptions = {
        body,
        icon: "/pnglogo.png", // optional icon
    };

    self.registration.showNotification(title, notificationOptions);

    self.addEventListener('install', () => {
        console.log('✅ Service Worker installed');
    });

    self.addEventListener('activate', () => {
        console.log('✅ Service Worker activated');
    });

});
