import { SidebarButton } from "./sidebar-button";
import { Home, MessageCircle, Key, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SidebarProps {
    setActivePage: (page: string) => void;
    activePage: string; // ✅ Track current active page
}

export const Sidebar: React.FC<SidebarProps> = ({ setActivePage, activePage }) => {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1024); // ✅ Now horizontal on both mobile & large screens
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isMobile === null) return null; // Avoid layout shift

    return (
        <motion.aside
            className={`fixed ${
                isMobile
                    ? "bottom-0 left-1/2 transform -translate-x-1/2 w-[100%] h-18 flex-row" // Mobile: Bottom horizontal
                    : "left-0 top-1/2 transform -translate-y-1/2 h-104 w-18 flex-col" // Large screen: Vertically centered
            } rounded-2xl shadow-lg z-50 p-2 flex items-center justify-around transition-all`}
            style={{
                background: "rgba(30, 30, 47, 0.7)", // Semi-transparent dark background
                backdropFilter: "blur(10px)", // Frosted glass effect
                border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border for depth
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* ✅ Buttons are now in a row for mobile and column for large screens */}
            <SidebarButton icon={Home} label="Home" isActive={activePage === "home"} onClick={() => setActivePage("home")} />
            <SidebarButton icon={Users} label="Community" isActive={activePage === "community"} onClick={() => setActivePage("community")} />
            <SidebarButton icon={MessageCircle} label="Chat" isActive={activePage === "chat"} onClick={() => setActivePage("chat")} />
            <SidebarButton icon={Key} label="Secretroom" isActive={activePage === "secretroom"} onClick={() => setActivePage("secretroom")} />
        </motion.aside>
    );
};