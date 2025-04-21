"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function LayoutTrans({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10);
        return () => clearTimeout(timeout);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={pathname}
                    initial={{
                        opacity: 0,
                        clipPath: "circle(0% at 50% 50%)",
                    }}
                    animate={{
                        opacity: 1,
                        clipPath: "circle(150% at 50% 50%)",
                    }}
                    exit={{
                        opacity: 0,
                        clipPath: "circle(0% at 50% 50%)",
                    }}
                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1], // springy feel
                    }}
                    className="min-h-screen"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
