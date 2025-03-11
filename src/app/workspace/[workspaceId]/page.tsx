"use client"; // ✅ Required for useState and useWorkspaceId

import { useState } from "react";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Sidebar } from "./sidebar";  // ✅ Import the modified Sidebar
import { ToolBar } from "./toolbar";
import CommunityPage from "../../community/page"; // ✅ Correctly import CommunityPage
import HomeDashboard from "@/app/home/page";

const WorkspaceIdPage = () => {
    const workspaceId = useWorkspaceId();
    const [activePage, setActivePage] = useState("home"); // ✅ Manage active page state

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                background: "linear-gradient(145deg, #1e1e2f 0%, #2a2a40 100%)", // Dark gradient background
            }}
        >
            {/* ✅ Toolbar (Remains fixed) */}
            <div className="h-11 flex-shrink-0 fixed top-0 left-0 right-0 z-50 bg-gray-800 shadow-md"> {/* Slightly darker for contrast */}
                <ToolBar />
            </div>

            <div className="flex flex-1 overflow-hidden flex-col md:flex-row pt-14">
                {/* ✅ Sidebar (Fixed the activePage prop) */}
                {/* Sidebar is now conditionally positioned based on screen size */}
                <div className="hidden md:block flex-shrink-0 bg-gray-900 border-r border-gray-700"> {/* Darker sidebar for better contrast */}
                    <Sidebar setActivePage={setActivePage} activePage={activePage} />
                </div>

                {/* ✅ Dynamic Page Switching with Improved Padding */}
                <div
                    className="flex-1 overflow-y-auto p-1 md:p-4 rounded-lg shadow-inner"
                    style={{
                        background: "rgba(30, 30, 47, 0.9)", // Semi-transparent dark background
                        backdropFilter: "blur(8px)", // Frosted glass effect
                    }}
                >
                    {activePage === "home" && <HomeDashboard />}
                    {activePage === "community" && <CommunityPage />} {/* ✅ Now correctly used */}
                    {activePage === "chat" && <ChatPage />}
                    {activePage === "secretroom" && <SecretRoomPage />}
                </div>

                {/* Mobile Sidebar (Bottom) */}
                <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
                    <Sidebar setActivePage={setActivePage} activePage={activePage} />
                </div>
            </div>
        </div>
    );
};

const ChatPage = () => <div className="p-4 md:p-8 text-gray-200">💬 Chat Page</div>;
const SecretRoomPage = () => <div className="p-4 md:p-8 text-gray-200">🔑 Secret Room</div>;

export default WorkspaceIdPage;