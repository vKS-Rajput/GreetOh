import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

interface SidebarButtonProps {
    icon: LucideIcon | IconType;
    label: string;
    isActive: boolean;
    onClick: () => void; // ✅ Handle active page switch
}

export const SidebarButton = ({ icon: Icon, label, isActive, onClick }: SidebarButtonProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={onClick} // ✅ Update state instead of using href
        >
            <Button
                variant="transparent"
                className={cn(
                    "size-12 p-2 rounded-2xl transition-all cursor-pointer",
                    "bg-[#1e1e2f] hover:bg-[#2a2a40]", // Darker background with hover effect
                    isActive && "bg-[#ff6384] shadow-lg" // Active state with vibrant pink
                )}
            >
                <Icon className={cn(
                    "size-6 text-white transition-all cursor-pointer",
                    isActive ? "scale-110" : "group-hover:scale-110"
                )} />
            </Button>
            <motion.span
                className={cn(
                    "text-xs font-semibold transition-all",
                    isActive ? "text-[#ff6384]" : "text-gray-300 hover:text-[#ff6384]" // Active and hover text color
                )}
                whileHover={{ scale: 1.1 }}
            >
                {label}
            </motion.span>
        </motion.div>
    );
};