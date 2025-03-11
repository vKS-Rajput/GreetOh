import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetWorkspace } from "@/features/workspace/api/use-get-workspace";
import { useGetWorkspaces } from "@/features/workspace/api/use-get-workspaces";
import { useCreateWorkspaceModel } from "@/features/workspace/store/use-create-workspace-model";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const WorkSpaceSwitcher = () => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({ id: workspaceId });
    const { data: workspaces } = useGetWorkspaces();
    const [open, setOpen] = useCreateWorkspaceModel();

    const filterWorkSpaces = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-bold text-xl crusor-pointer">
                    {workspaceLoading ? (
                        <Loader className="size-5 animate-spin shrink-0" />
                    ) : (
                        workspace?.name.charAt(0).toUpperCase()
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-64">
                {/* Active Workspace */}
                <DropdownMenuItem
                    onClick={() => router.push(`/workspace/${workspaceId}`)}
                    className="cursor-pointer flex-col justify-start items-start capitalize"
                >
                    {workspace?.name}
                    <span className="text-xs text-muted-foreground">
                        Active Workspace
                    </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Other Workspaces */}
                {filterWorkSpaces?.map((workspace) => (
                    <DropdownMenuItem
                        key={workspace._id}
                        className="cursor-pointer capitalize"
                        onClick={() => router.push(`/workspace/${workspace._id}`)}
                    >
                        <div className="size-6 flex items-center justify-center bg-[#6f6e6e] text-slate-800 font-semibold text-lg rounded-md mr-2">
                            {workspace.name.charAt(0).toUpperCase()}
                        </div>
                       <p className="truncate">{workspace.name}</p>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Create New Workspace */}
                <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => setOpen(true)}
                >
                    <div className="size-6 flex items-center justify-center bg-[#F2F2F2] text-slate-800 font-semibold text-lg rounded-md mr-2">
                        <Plus className="size-4" />
                    </div>
                    Create New Workspace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};