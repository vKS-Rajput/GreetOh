"use client"

import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const workspaceIdPage = () => {
    const workspaceId = useWorkspaceId();
    const { data } = useGetWorkspace({id: workspaceId});
    return(
        <div>
            
        </div>
    );
}
export default workspaceIdPage;