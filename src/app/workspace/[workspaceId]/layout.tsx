"use client";

import { Sidebar } from "./sidebar";
import { ToolBar } from "./toolbar";
import { useEffect, useState } from "react";

import { ResizableHandle,ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

interface WorkSpaceIdLayoutProps {
    children: React.ReactNode;
}

const WorkSpaceIdLayout = ({ children }: WorkSpaceIdLayoutProps) => {
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
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Fixed ToolBar at the top */}
            <div className="h-14 flex-shrink-0 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <ToolBar />
            </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto bg-gray-100">
                    {children}
                </div>
            </div>
    );
};

export default WorkSpaceIdLayout;
