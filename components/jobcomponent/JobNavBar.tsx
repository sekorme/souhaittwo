"use client";
import {
  AlertCircle,
  Bell,
  Bookmark,
  Briefcase,
  FileText,
  Lock,
  LogOut,
  Menu,
  MessageSquare,
  Trash,
  User,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

const sidebarItems = [
  { name: "Dashboard", icon: User, href: "/jobs" },
  { name: "My Profile", icon: User, href: "/profile" },
  { name: "My Resume", icon: FileText, href: "/resume" },
  { name: "Applied Jobs", icon: Briefcase, href: "/jobs/applied" },
  { name: "Job Alerts", icon: AlertCircle, href: "/jobs/search" },
  { name: "Shortlisted Jobs", icon: Bookmark, href: "/shortlist" },
  { name: "CV Manager", icon: FileText, href: "/cv-manager" },
  { name: "Packages", icon: Briefcase, href: "/packages" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
  { name: "Change Password", icon: Lock, href: "/change-password" },
  { name: "Logout", icon: LogOut, href: "/logout" },
  { name: "Delete Profile", icon: Trash, href: "/delete-profile" },
];

interface JobNavBarProps {
  name?: string;
  avatarUrl?: string;
  email?: string;
}

export default function JobNavBar({ name, avatarUrl, email }: JobNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const normalize = (path: string) => path.replace(/\/+$/, "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") setIsOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-900 p-4 rounded shadow mb-6 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Button
            className="md:hidden text-gray-700 dark:text-gray-100"
            variant="ghost"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu />
          </Button>
          <span className="ml-2 font-light text-xl text-gray-800 dark:text-white">
            Howdy, {name?.split(" ")[0] ?? "Jerome"}!!
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Bell className="text-blue-600 dark:text-blue-400" />
          {avatarUrl ? (
            <img
              alt={name ?? "Avatar"}
              className="w-10 h-10 rounded-full object-cover"
              src={avatarUrl}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
          )}
        </div>
      </div>

      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {isOpen && (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <div
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black bg-opacity-30"
            role="dialog"
            tabIndex={-1}
            onClick={() => setIsOpen(false)}
            onKeyDown={handleKeyDown}
          >
            <motion.div
              animate={{ x: 0 }}
              className="w-64 h-full bg-white dark:bg-gray-900 shadow-lg"
              exit={{ x: -300 }}
              initial={{ x: -300 }}
              transition={{ type: "spring", stiffness: 60 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-600 dark:text-blue-400">
                  Superio
                </h2>
                <ul className="space-y-2">
                  {sidebarItems.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive =
                      normalize(pathname) === normalize(item.href);

                    return (
                      <li key={idx}>
                        <Link
                          className={clsx(
                            "flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-300",
                            isActive
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 font-semibold"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                          )}
                          href={item.href}
                        >
                          <Icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
