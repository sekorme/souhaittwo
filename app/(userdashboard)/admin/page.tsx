'use client';

import { useState } from 'react';

export default function AdminDashboard() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const sendNotification = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('/api/send-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, body }),
            });

            const data = await res.json();
            if (data.success) {
                setMessage('✅ Notification sent successfully!');
                setTitle('');
                setBody('');
            } else {
                setMessage(`❌ Failed: ${data.error}`);
            }
        } catch (error) {
            setMessage('❌ An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">📢 Send Push Notification</h1>

            <input
                type="text"
                placeholder="Notification Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
            />

            <textarea
                placeholder="Notification Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded h-28"
            />

            <button
                onClick={sendNotification}
                disabled={loading || !title || !body}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
                {loading ? 'Sending...' : 'Send Notification'}
            </button>

            {message && <p className="text-sm text-gray-700">{message}</p>}
        </div>
    );
}
