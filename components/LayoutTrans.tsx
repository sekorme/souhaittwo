"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function LayoutTrans({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname} // Ensures re-render on route change
                initial={{ x: "100%", opacity: 0 }} // Start off-screen to the right
                animate={{ x: 0, opacity: 1 }} // Slide in to position
                exit={{ x: "-100%", opacity: 0 }} // Slide out to the left
                transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth animation
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
