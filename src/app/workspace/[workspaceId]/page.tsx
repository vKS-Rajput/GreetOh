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
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* ✅ Toolbar (Remains fixed) */}
            <div className="h-11 flex-shrink-0 fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <ToolBar />
            </div>

            <div className="flex flex-1 overflow-hidden flex-col md:flex-row pt-14">
                {/* ✅ Sidebar (Fixed the activePage prop) */}
                <div className="flex-shrink-0 bg-white border-r">
                    <Sidebar setActivePage={setActivePage} activePage={activePage} />
                </div>

                {/* ✅ Dynamic Page Switching with Improved Padding */}
                <div className="flex-1 overflow-y-auto p-1 md:p-4 bg-gray-100">
                    {activePage === "home" && <HomeDashboard />}
                    {activePage === "community" && <CommunityPage />} {/* ✅ Now correctly used */}
                    {activePage === "chat" && <ChatPage />}
                    {activePage === "secretroom" && <SecretRoomPage />}
                </div>
            </div>
        </div>
    );
};

const ChatPage = () => <div className="p-4 md:p-8">💬 Chat Page</div>;
const SecretRoomPage = () => <div className="p-4 md:p-8">🔑 Secret Room</div>;

export default WorkspaceIdPage;
