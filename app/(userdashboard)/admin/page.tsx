'use client';

import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import axios from 'axios';
import { db } from '@/firebase/client';

type UserType = {
    id: string;
    name?: string;
    email?: string;
    fcmToken?: string;  // or string[] if multiple tokens per user
};

export default function AdminNotificationPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserType));
            setUsers(data.filter(u => !!u.fcmToken));
        };

        fetchUsers();
    }, []);

    const sendNotification = async (token: string) => {
        setSending(true);
        try {
            await axios.post('/api/notify', { token, title, body });
            alert('Notification sent!');
        } catch (err) {
            console.error(err);
            alert('Failed to send notification.');
        }
        setSending(false);
    };

    const sendToAll = async () => {
        if (!title || !body) return alert('Enter both title and message');
        if (users.length === 0) return alert('No users with tokens found');

        setSending(true);
        try {
            const tokens = users.map(u => u.fcmToken!).filter(Boolean);
            await axios.post('/api/send-notification', { tokens, title, body });
            alert('Bulk notification sent!');
        } catch (err) {
            console.error(err);
            alert('Failed to send bulk notification.');
        }
        setSending(false);
    };

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-4">📢 Admin Push Notifications</h1>

            <div className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    placeholder="Notification Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Notification Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button
                    disabled={sending}
                    onClick={sendToAll}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    🚀 Send to All Users
                </button>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-2">Users with FCM Tokens:</h2>
            <div className="space-y-2">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="p-3 border rounded flex items-center justify-between"
                    >
                        <div>
                            <p className="font-medium">{user.name || user.email}</p>
                            <p className="text-sm text-gray-500 truncate">{user.fcmToken}</p>
                        </div>
                        <button
                            disabled={sending}
                            onClick={() => user.fcmToken && sendNotification(user.fcmToken)}
                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                        >
                            Send
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
