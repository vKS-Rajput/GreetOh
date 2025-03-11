import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const useUserConfirm = (
    title: string,
    message: string,
): [() => Promise<boolean>, React.ReactNode] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = () => {
        return new Promise<boolean>((resolve) => {
            setPromise({ resolve });
        });
    };

    const handleClose = () => {
        setPromise(null);
    };

    const handleCancel = () => {
        if (promise) {
            promise.resolve(false);
        }
        handleClose();
    };

    const handleConfirm = () => {
        if (promise) {
            promise.resolve(true);
        }
        handleClose();
    };

    const ConfirmationDialog = (
        <Dialog open={promise !== null} onOpenChange={handleCancel}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return [confirm, ConfirmationDialog];
};