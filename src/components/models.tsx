"use client"
import { CreateWorkspaceModel } from "@/features/workspace/components/create-workspace-model"
import { useEffect, useState } from "react";
import { CreateChannelModel } from "@/features/channels/componants/create-channel-model";

export const Models = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() =>{
        setMounted(true);
    },[]);

    if (!mounted) {
        return null;
    }
    return (
        <>
            <CreateWorkspaceModel />
            <CreateChannelModel />
        </>
    );
};