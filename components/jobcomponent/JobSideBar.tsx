"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LogOut,
    Trash,
    Lock,
    MessageSquare,
    FileText,
    Bookmark,
    Briefcase,
    AlertCircle,
    User,
    X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { useState } from "react";

const sidebarItems = [
    { name: "Dashboard", icon: User, href: "/jobs" },
    { name: "My Profile", icon: User, href: "/profile" },
    { name: "My Resume", icon: FileText, href: "/resume" },
    { name: "Applied Jobs", icon: Briefcase, href: "/jobs/applied" },
    { name: "Job Alerts", icon: AlertCircle, href: "/jobs/search" },
    { name: "Saved Jobs", icon: Bookmark, href: "/jobs/saved" },
    { name: "CV Manager", icon: FileText, href: "/cv-manager" },
    { name: "Packages", icon: Briefcase, href: "/packages" },
    { name: "Messages", icon: MessageSquare, href: "/messages" },
    { name: "Change Password", icon: Lock, href: "/change-password" },
    { name: "Logout", icon: LogOut, href: "/logout" },
    { name: "Delete Profile", icon: Trash, href: "/delete-profile" },
];

export default function JobSideBar({

}) {
    const pathname = usePathname();

    const sidebar = (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                Souhait
            </h2>
            <ul className="space-y-2">
                {sidebarItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive =
                        pathname === item.href
                    return (
                        <li key={idx}>
                            <Link
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300",
                                    isActive
                                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                )}

                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 h-screen bg-white dark:bg-gray-900 shadow-md">
                {sidebar}
            </aside>


        </>
    );
}
