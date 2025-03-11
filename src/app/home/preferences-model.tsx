import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { TrashIcon, EditIcon } from "lucide-react"; // Added EditIcon for consistency
import { useUpdateWorkSpace } from "@/features/workspace/api/use-update-workspace";
import { useRemoveWorkSpace } from "@/features/workspace/api/use-remove-workspace";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserConfirm } from "@/hooks/user-confirm";
interface PreferencesModelProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialValue: string;
}

export const PreferencesModel = ({ open, setOpen, initialValue }: PreferencesModelProps) => {
    const [confirm, ConfirmationDialog] = useUserConfirm("Delete Workspace", "Are you sure you want to delete this workspace?");
    const workspaceId = useWorkspaceId();
    const router = useRouter();
    const [value, setValue] = useState(initialValue);
    const [editOpen, setEditOpen] = useState(false);

    const { mutate: updateWorkspace, isPending: isUpdating } = useUpdateWorkSpace ();
    const { mutate: removeWorkspace, isPending: isRemoving } = useRemoveWorkSpace();

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateWorkspace({id: workspaceId, name: value},
            {onSuccess: () => {
                toast.success("Workspace updated successfully");
                setEditOpen(false);
            },
            onError: () => {
                toast.error("Failed to update workspace");
            }
        });
    }

    const handleDelete = async () => {
        const confirmed = await confirm();
        if (!confirmed) return;
        removeWorkspace({id: workspaceId},
            {onSuccess: () => {
                router.replace("/");
                toast.success("Workspace deleted successfully");
                setOpen(false);
            },
            onError: () => {
                toast.error("Failed to delete workspace");
            }
        });
    }
    // Update the state if initialValue changes
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <>
        {ConfirmationDialog}
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="p-0 bg-white overflow-hidden rounded-lg shadow-xl animate-in fade-in-90 zoom-in-95">
                <DialogHeader className="p-6 border-b border-gray-100">
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        {value}
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500 mt-1">
                        Manage your workspace settings and preferences.
                    </DialogDescription>
                </DialogHeader>

                {/* Workspace Details Section */}
                <div className="px-6 py-4 space-y-4">
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogTrigger asChild>
                    <div className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-700">Workspace Name</p>
                            <button
                                className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                                onClick={() => {}}
                            >
                                <EditIcon className="size-4 mr-1" />
                                Edit
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{value}</p>
                    </div>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Workspace</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4" onSubmit={handleEdit}>
                            <Input value={value} onChange={(e) => setValue(e.target.value)}  disabled={isUpdating} required autoFocus minLength={3} maxLength={80} placeholder="Workspace Name e.g. 'Work', 'Personal', 'School'" />
                            <DialogFooter>
                                <DialogClose asChild>
                                <Button type="submit" disabled={isUpdating}>Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={isUpdating}>Save</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                    </Dialog>

                    {/* Delete Workspace Button */}
                    <button
                        className="w-full flex items-center justify-center gap-x-2 px-4 py-3 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-all duration-200 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                        onClick={handleDelete}
                    >
                        <TrashIcon className="size-4" />
                        <p className="text-sm font-semibold">Delete Workspace</p>
                    </button>
                </div>

                {/* Dialog Footer */}
                <DialogFooter className="p-6 border-t border-gray-100">
                    <Button
                        variant="outline"
                        className="text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500"
                        onClick={() => setOpen(false)}
                    >
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    );
};