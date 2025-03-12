"use client";

import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, HashIcon, Loader } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";
import { SidebarItem } from "./sidebar-items";
import { useGetChannels } from "@/features/channels/api/use-get-channel";
import { WorkspaceSection } from "../workspace/[workspaceId]/workspaceSection";
import { UserItem } from "../workspace/[workspaceId]/userItem";
import { Key } from "react";
import { useGetMembers } from "@/features/members/api/use-get-members copy";
import { useCreateChannelModel } from "@/features/channels/store/use-create-channel-model";

export default function HomeDashboard() {
    const workspaceId = useWorkspaceId();
    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: channels, isLoading: channelsLoading } = useGetChannels({ workspaceId });
    const { data: members, isLoading: membersLoading } = useGetMembers({ workspaceId });
    const [_open, setOpen] = useCreateChannelModel(); // Correct destructuring

    // Loading state
    if (workspaceLoading || memberLoading || channelsLoading || membersLoading) {
        return (
            <div className="flex flex-col bg-gray-600 dark:bg-gray-900 h-full items-center justify-center">
                <Loader className="size-5 w-full animate-spin text-gray-500 dark:text-gray-400" />
            </div>
        );
    }

    // Error state (workspace or member not found)
    if (!workspace || !member) {
        return (
            <div className="flex flex-col bg-gray-600 dark:bg-gray-900 h-full items-center justify-center">
                <AlertTriangle className="size-5 text-red-500 dark:text-red-400" />
                <p className="text-black dark:text-white text-sm mt-2">Workspace not found</p>
            </div>
        );
    }

    // Main content
    return (
        <div className="flex flex-col h-full dark:bg-gray-900">
            {/* Workspace Header*/}
            <WorkspaceHeader workspace={workspace} isAdmin={member.role === "admin"} /> 

            {/* Channels Section */}
            <div className="flex flex-col p-4 space-y-4">
                {/* My Channels Section */}
                <WorkspaceSection label="My Channels" hint="Create a new channel" onNew={(member.role == "admin" ? () => setOpen(true) : undefined)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {channels?.map((item) => (
                            <SidebarItem key={item._id} icon={HashIcon} label={item.name} id={item._id} />
                        ))}
                    </div>
                </WorkspaceSection>

                {/* Line Separator */}
                <div className="border-b border-gray-500" />

                {/* Members Section */}
                <WorkspaceSection label="Chats" hint="View all members" onNew={() => {}}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                        {members?.map((item) => (
                            <UserItem
                                key={item.user._id}
                                id={item.user._id}
                                label={item.user.name || ''}
                                image={item.user.image}
                            />
                        ))}
                    </div>
                </WorkspaceSection>
            </div>
        </div>
    );
}

