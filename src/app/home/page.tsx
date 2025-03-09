"use client"; // ✅ Required to use React hooks like useWorkspaceId

import { useCurrentMember } from "@/features/members/api/use-current-members";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import { WorkspaceHeader } from "./workspace-header";

export default function HomeDashboard() {
    const workspaceId = useWorkspaceId();
    const { data: member, isLoading: memberLoading } = useCurrentMember({ workspaceId });
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });

    if (workspaceLoading || memberLoading) {
        return (
            <div className="flex flex-col  h-full items-center justify-center">
                <Loader className="size-5 w-full animate-spin text-gray-500" />
            </div>
        );
    }

    if (!workspace || !member) {
        return (
            <div className="flex flex-col  h-full items-center justify-center">
                <AlertTriangle className="size-5 w-full " />
                <p className="text-black text-sm">Workspace not Found</p>
            </div>
        );
    }

    return (
       <div>
        <WorkspaceHeader workspace={workspace} isAdmin={member.role == "admin"}/>
       </div>
    );
}
