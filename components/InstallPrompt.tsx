'use client';

import { useEffect, useState } from 'react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const result = await deferredPrompt.userChoice;
            if (result.outcome === 'accepted') {
                console.log('✅ App installed');
            } else {
                console.log('❌ User dismissed');
            }
            setDeferredPrompt(null);
            setShowPrompt(false);
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-white shadow-md rounded-lg z-50">
            <p className="mb-2">Install Souhait App?</p>
            <button
                onClick={handleInstall}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
                Install
            </button>
        </div>
    );
}
