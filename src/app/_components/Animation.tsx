"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export const Animation = ({ children }: any) => {
    const path = usePathname();

    return (
        <AnimatePresence initial={true} mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
            <motion.div
                key={path}
                initial={{ opacity: 0, width: "100%" }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0, ease: "easeInOut" }}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
};