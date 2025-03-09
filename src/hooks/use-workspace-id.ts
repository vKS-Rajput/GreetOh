"use client"

import { useParams } from "next/navigation";
import { Id } from "../../convex/_generated/dataModel";

export const useWorkspaceId = () => {
    const params = useParams();

    // Ensure the parameter exists and is of the correct type
    if (!params.workspaceId) {
        throw new Error("workspaceId is not available in the URL parameters.");
    }

    return params.workspaceId as Id<"workspaces">;
};