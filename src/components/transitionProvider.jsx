"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Header from '@/components/main/header/index';

export default function TransitionProvider({ children }) {
    const pathname = usePathname();
    return (
        <AnimatePresence mode="wait" key={pathname}>
            <motion.div
                animate={{ height: "0vh" }}
                exit={{ height: "100vh" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-screen h-screen fixed bg-black z-40"
            />
            <Header />
            {children}
        </AnimatePresence>
    )
}