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
            className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[800px] h-16 rounded-2xl bg-white/30 backdrop-blur-md flex-row shadow-lg z-50 p-2 flex items-center justify-around transition-all`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* ✅ Buttons are now always in a row */}
            <SidebarButton icon={Home} label="Home" isActive={activePage === "home"} onClick={() => setActivePage("home")} />
            <SidebarButton icon={Users} label="Community" isActive={activePage === "community"} onClick={() => setActivePage("community")} />
            <SidebarButton icon={MessageCircle} label="Chat" isActive={activePage === "chat"} onClick={() => setActivePage("chat")} />
            <SidebarButton icon={Key} label="Secretroom" isActive={activePage === "secretroom"} onClick={() => setActivePage("secretroom")} />
        </motion.aside>
    );
};
