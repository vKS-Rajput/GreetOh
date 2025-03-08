"use client";

import { Sidebar } from "./sidebar";
import { ToolBar } from "./toolbar";
import { useEffect, useState } from "react";

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

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden flex-col md:flex-row pt-14">
                {/* Sidebar (Turns into Bottom Navbar on Mobile) */}
                <div className={`md:w-[80px] flex-shrink-0 ${isMobile ? "fixed bottom-0 left-0 w-full bg-white/30 backdrop-blur-md flex justify-around py-2 z-50 shadow-lg border-t border-gray-200" : ""}`}>
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-100">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default WorkSpaceIdLayout;
