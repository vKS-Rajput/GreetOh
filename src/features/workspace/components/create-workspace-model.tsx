"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModel } from "../store/use-create-workspace-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const CreateWorkspaceModel = () => {
    const router = useRouter();
    const [open, setOpen] = useCreateWorkspaceModel();
    const [name, setName] = useState("");
    const { mutate, isPending } = useCreateWorkSpace();
    const handleClose = () => {
        setOpen(false);
        setName("");
    }

    const handleSubmit = (async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate({name},{
            onSuccess(id){
                toast.success("Workspace Created Successfully")
                router.push(`/workspace/${id}`)
                handleClose();
                
            }
        })
    }) 

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create your Workspace</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input value={name} 
                    onChange={(e)=> setName(e.target.value)}
                    disabled={isPending}
                    required
                    autoFocus
                    minLength={3}
                    placeholder="Workspace Name: e.g. 'Personal', 'Work'"/>
                    <div className="flex justify-end">
                        <Button  disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}