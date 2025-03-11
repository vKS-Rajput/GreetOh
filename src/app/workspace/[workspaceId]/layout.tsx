"use client";

import { Sidebar } from "./sidebar";
import { ToolBar } from "./toolbar";
import { useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface WorkSpaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // ✅ Mobile breakpoint
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-700"> {/* ✅ Updated background */}
            {/* ✅ Fixed ToolBar at the top with improved contrast */}
            <div className="h-14 flex-shrink-0 fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md">
                <ToolBar />
            </div>

            {/* ✅ Main Content with Left Margin for Large Screens */}
            <div className={`flex-1 overflow-hidden bg-gray-600 ${isMobile ? "" : "ml-18"}`}> {/* ✅ Left margin for large screens */}
                {children}
            </div>

            {/* ✅ Sidebar (Fixed for large screens, bottom for mobile) */}
            <div className={`fixed ${isMobile ? "bottom-0 left-0 right-0" : "left-0 top-14 h-[calc(100vh-3.5rem)] w-18"}`}>
                <Sidebar setActivePage={() => {}} activePage="home" /> {/* ✅ Placeholder props */}
            </div>
        </div>
    );
};

export default WorkSpaceIdLayout;