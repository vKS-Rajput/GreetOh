import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { stat } from "fs";

// Define the expected request and response types
type RequestType = { name: string } ;
type ResponseType = Id<"workspaces"> | null; // Adjust based on your mutation's return type

type Options = {
    onSuccess?: (data: Id<"workspaces">) => void; // Pass response data to onSuccess
    onError?: (error: Error) => void; // Pass error object to onError
    onSettled?: () => void;
    throError?: boolean;
};

export const useCreateWorkSpace = () => {
    const [data, setData] = useState<ResponseType>(null);
    const [ error, setError] = useState<Error | null>(null);

    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null)

    const isPending = useMemo(() => status === "pending", [status])
    const isSuccess = useMemo(() => status === "success", [status])
    const isError = useMemo(() => status === "error", [status])
    const isSettled = useMemo(() => status === "settled", [status])
    const mutation = useMutation(api.workspaces.create);

    const mutate = useCallback(
        async (values: RequestType, options?: Options) => {
            try {
                setData(null);
                setError(null);
                setStatus("pending")
                const response = await mutation(values);
                options?.onSuccess?.(response); // Pass response data to onSuccess
                return response
            } catch (error) {
                options?.onError?.(error as Error); // Pass error object to onError
                if ( options?.throError) {
                    throw error
                }
            } finally {
                setStatus("settled")
                options?.onSettled?.();
            }
        },
        [mutation] // Include mutation in dependencies
    );

    return {
        mutate,data, isError, isPending, isSettled, isSuccess, error
    };
};