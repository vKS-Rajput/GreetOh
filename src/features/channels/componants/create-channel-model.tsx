import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useCreateChannelModel } from "../store/use-create-channel-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateChannel } from "../api/use-create-channel";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

export const CreateChannelModel = () => {
    const {mutate, isPending} = useCreateChannel();
    const workspaceId = useWorkspaceId();
    const [open, setOpen] = useCreateChannelModel(); // Ensure this returns [boolean, function]
    const [name, setName] = useState("");

    const handleClose = () => {
        setOpen(false);
        setName("");
    }

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s+/g, "").toLowerCase(); // Remove spaces and convert to lowercase
        setName(value);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission behavior
        mutate({name, workspaceId: workspaceId}, {
            onSuccess: (data) => {
                handleClose();
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Channel</DialogTitle>
                    <DialogDescription>
                        Create a new channel to start chatting with your team.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        onChange={handleInputChange} // Use handleInputChange for input changes
                        disabled={isPending}
                        required
                        autoFocus
                        placeholder="Channel Name"
                        minLength={3}
                        maxLength={80}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={!name}>Create</Button> {/* Disable button if name is empty */}
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};