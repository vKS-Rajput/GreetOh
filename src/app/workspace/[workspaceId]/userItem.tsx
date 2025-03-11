import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// Define the card variants using `cva`
const userItemVariants = cva(
    "flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300",
    {
        variants: {
            variant: {
                default: "bg-white dark:bg-gray-800 text-gray-900 dark:text-white",
                active: "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface UserItemProps {
    id: Id<"users">;
    label?: string;
    image?: string;
    variant?: VariantProps<typeof userItemVariants>["variant"];
}

export const UserItem = ({ id, label = "Member", image, variant }: UserItemProps) => {
    const workspaceId = useWorkspaceId();
    const avatarFallback = label.charAt(0).toUpperCase();

    return (
        <Button variant={"transparent"} className={cn(userItemVariants({ variant }))} size={"sm"} asChild>
            <Link href={`/workspace/${workspaceId}/member/${id}`} aria-label={`View ${label}'s profile`}>
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <Avatar className="size-10 rounded-md">
                        <AvatarImage src={image} alt={label} />
                        <AvatarFallback className="bg-blue-500 dark:bg-gray-600 text-gray-700 dark:text-gray-200">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    {/* Label */}
                    <span className="text-sm font-medium truncate">{label}</span>
                </div>
            </Link>
        </Button>
    );
};