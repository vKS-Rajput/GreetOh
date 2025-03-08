"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCreateWorkspaceModel } from "../store/use-create-workspace-model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkSpace } from "../api/use-create-workspace";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const CreateWorkspaceModel = () => {
    const router = useRouter();
    const [open, setOpen] = useCreateWorkspaceModel();
    const [name, setName] = useState("");
    const { mutate, isPending } = useCreateWorkSpace();
    
    const handleClose = () => {
        setOpen(false);
        setName("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ name }, {
            onSuccess(id) {
                toast.success("Workspace Created Successfully");
                router.push(`/workspace/${id}`);
                handleClose();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="rounded-2xl bg-white shadow-xl p-6 border border-gray-200">
                <DialogHeader className="flex flex-col items-center">
                    <DialogTitle className="text-2xl font-bold text-gray-800">
                        🎨 Create Your Workspace
                    </DialogTitle>
                    <p className="text-gray-500 text-sm text-center mt-1">
                        Give your workspace a fun and creative name!
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        disabled={isPending}
                        required
                        autoFocus
                        minLength={3}
                        placeholder="e.g. 'Personal', 'Creative Lab'"
                        className="rounded-xl border-2 border-blue-300 px-4 py-2 shadow-md focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <div className="flex justify-center">
                        <motion.button 
                            type="submit"
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            disabled={isPending}
                            className="px-6 py-2 bg-[#e9a586] text-white font-bold rounded-full shadow-md transition hover:[#e9a586]/20 disabled:opacity-50"
                        >
                            🚀 Create Workspace
                        </motion.button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
