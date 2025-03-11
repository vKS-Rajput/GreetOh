import { Button } from "@/components/ui/button";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { WorkSpaceSwitcher } from "./work-space-switcher";
import { UserButton } from "@/features/authFeatures/components/user-button";

export const ToolBar = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspace({ id: workspaceId });

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <motion.nav
            className="flex items-center justify-between h-14 p-2 md:px-6 border-b border-gray-700 shadow-lg"
            style={{
                background: "rgba(30, 30, 47, 0.7)", // Semi-transparent dark background
                backdropFilter: "blur(10px)", // Frosted glass effect
            }}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Left Side - WorkSpaceSwitcher */}
            <div className="flex-1 flex items-center ml-2">
                <WorkSpaceSwitcher />
            </div>

            {/* Middle - Search Bar */}
            <div className="flex-1 flex justify-center">
                <motion.div
                    className="w-full max-w-[500px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        size="sm"
                        className="bg-gray-700 hover:bg-gray-600 w-full h-9 px-3 rounded-lg border border-gray-600 flex items-center justify-start truncate "
                    >
                        <Search className="size-5 text-gray-300 mr-2 " />
                        <span className="text-gray-300 text-sm font-semibold truncate">
                            Search {data?.name}
                        </span>
                    </Button>
                </motion.div>
            </div>

            {/* Right Side - Info Button & User Button */}
            <div className="flex-1 flex items-center justify-end">
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 border border-gray-600 mr-2"
                    >
                        <Info className="size-6 text-gray-300" />
                    </Button>
                </motion.div>
                <UserButton />
            </div>
        </motion.nav>
    );
};