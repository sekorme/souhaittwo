"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, MessageSquare, User, ArchiveRestore, Mic, File } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import Next.js usePathname
import { ThemeSwitch } from "@/components/theme-switch";

const navItems = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "My Jobs", href: "/jobs", icon: Briefcase },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Files", href: "/files", icon: ArchiveRestore },
  { name: "Interview", href: "/interview", icon: Mic },
];
type tryColor = "documents" | "images" | "media"  | "others";

const BottomNavbar = () => {
  const pathname = usePathname(); // Get the current path dynamically
let color: tryColor = (pathname.split("/")[2] as tryColor) || "documents";
  return (
      <nav className="fixed bottom-0 bg-white left-0 w-full dark:bg-black border-t-4 rounded-t-2xl border-[#00D748] shadow-lg flex justify-around py-3 z-100" >
        {navItems.map((item) => {
          const isActive = pathname === item.href ||`${item.href}/${color}` === pathname;

          return (
              <Link
                  key={item.name}
                  className="relative flex flex-col items-center text-gray-500 hover:text-[#ff3d57] transition"
                  href={item.href}
              >
                <motion.div
                    animate={{ y: isActive ? -5 : 0, scale: isActive ? 1.2 : 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon
                      className={`w-6 h-6 ${isActive ? "text-[#ff3d57]" : "text-gray-500"}`}
                  />
                </motion.div>
                <span
                    className={`text-xs mt-1 ${isActive ? "text-[#ff3d57]" : "text-gray-500"}`}
                >
              {item.name}
            </span>
                {isActive && (
                    <motion.div
                        animate={{ opacity: 1 }}
                        className="absolute bottom-[-2px] w-4 h-1 bg-[#ff3d57] rounded-full"
                        initial={{ opacity: 0 }}
                        layoutId="activeIndicator"
                    />
                )}
              </Link>
          );
        })}
        <ThemeSwitch />
      </nav>
  );
};

export default BottomNavbar;
