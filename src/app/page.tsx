"use client";

import { UserButton } from "@/features/authFeatures/components/user-button";
import { useCreateWorkspaceModel } from "@/features/workspace/store/use-create-workspace-model";
import { useGetWorkspaces } from "@/features/workspace/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
    const router = useRouter();
    const { data, isLoading} = useGetWorkspaces();
    const [open, setOpen] = useCreateWorkspaceModel();

    const workSpaceId = useMemo(()=> data?.[0]?._id,[data]);

    useEffect( () => {
        if (isLoading) {
            return;
        }

        if (workSpaceId) {
            router.replace(`/workspace/${workSpaceId}`)
        } else if (!open) {
            setOpen(true)
        }
    },[workSpaceId,isLoading, open, setOpen, router])
return (
    <div>
        <UserButton/>
    </div>
)
}
