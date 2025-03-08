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
            className="bg-[#FF6F61] flex items-center justify-between h-14 p-2 md:px-6"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Left Side - WorkSpaceSwitcher with Label Below */}
            <div className="flex-1 flex flex-col items-start ml-2">
                <WorkSpaceSwitcher />
                
            </div>

            {/* Middle - Search Bar (Centered) */}
            <div className="flex-1 flex justify-center">
                <motion.div
                    className="w-full max-w-[500px]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Button
                        size="sm"
                        className="bg-[#ea867c] hover:bg-[#e2b59e] w-full h-9 px-3 rounded-xl border border-[#ee8c73] flex items-center justify-start"
                    >
                        <Search className="size-5 text-[#481320] mr-2" />
                        <span className="text-[#481320] text-sm font-semibold">
                            Search {data?.name}
                        </span>
                    </Button>
                </motion.div>
            </div>

            {/* Right Side - Info Button & User Button */}
            <div className="flex-1 flex items-center justify-end">
                <motion.div whileHover={{ rotate: 15, scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button
                        variant="transparent"
                        size="sm"
                        className="p-2 rounded-full bg-[#e9a586] hover:bg-[#f9d0bb] border border-[#ea8177] mr-2"
                    >
                        <Info className="size-6 text-[#481320]" />
                    </Button>
                </motion.div>
                <UserButton />
            </div>
        </motion.nav>
    );
};
