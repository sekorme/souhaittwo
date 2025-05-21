"use client";

import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { Bell } from "lucide-react";
import { toast } from "react-hot-toast";

import { db } from "@/firebase/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { markNotificationAsRead } from "@/lib/actions/markNotificationRead";

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: any;
};

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as Notification,
      );
      const latest = items[0];

      if (
        items.length > notifications.length &&
        latest &&
        latest.read === false &&
        !notifications.some((n) => n.id === latest.id)
      ) {
        toast.success(`${latest.title}\n${latest.message}`, {
          duration: 5000,
        });
      }

      setNotifications(items);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
              {unreadCount}
            </span>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-96 max-h-[70vh] overflow-y-auto z-50">
        <h4 className="text-lg font-semibold mb-3">Notifications</h4>
        {notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications yet.</p>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`text-sm border-b pb-2 cursor-pointer transition-all ${
                  !n.read ? "bg-blue-50 hover:bg-blue-100" : ""
                }`}
                onClick={async () => {
                  if (!n.read) await markNotificationAsRead(n.id);
                }}
              >
                <strong>{n.title}</strong>
                <p>{n.message}</p>
                <p className="text-xs text-gray-400">
                  {new Date(
                    n.createdAt?.toDate?.() || n.createdAt,
                  ).toLocaleString()}
                </p>
                {!n.read && (
                  <span className="text-xs text-blue-500 font-medium">
                    Unread
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </PopoverContent>
    </Popover>
  );
}
