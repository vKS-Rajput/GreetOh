import { UserButton } from "@/features/authFeatures/components/user-button";
import { SidebarButton } from "./sidebar-button";
import { Home, MessageCircle, Key } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const Sidebar = () => {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Prevent hydration mismatch
    if (isMobile === null) return null;

    return (
        <motion.aside
            className={`fixed ${isMobile
                ? "bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] h-16 rounded-2xl bg-white/30 backdrop-blur-md flex-row shadow-lg"
                : "w-[80px] h-screen bg-[#FF6F61] flex-col pt-8 pb-5 border-r-2 border-[#FF3B2F] overflow-hidden"
            } flex items-center justify-center gap-4 z-50 p-2`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {isMobile ? (
                // Mobile View - Bottom Navigation
                <div className="flex justify-around w-full">
                    <SidebarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")} />
                    <SidebarButton icon={MessageCircle} label="Chat" />
                    <SidebarButton icon={Key} label="Secretroom" />
                </div>
            ) : (
                // Desktop View - Vertical Sidebar
                <div className="flex flex-col gap-y-4 items-center w-full">
                    <SidebarButton icon={Home} label="Home" isActive={pathname.includes("/workspace")} />
                    <SidebarButton icon={MessageCircle} label="Chat" />
                    <SidebarButton icon={Key} label="Secretroom" />
                </div>
            )}
        </motion.aside>
    );
};
