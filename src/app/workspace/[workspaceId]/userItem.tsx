import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Id } from "../../../../convex/_generated/dataModel";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// Define the card variants using `cva`
const userItemVariants = cva(
    "flex items-center gap-4 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow-md hover:shadow-lg transition-transform transform hover:scale-105 duration-300",
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
        <Button
            variant={"transparent"}
            className={cn(userItemVariants({ variant }), "w-auto h-12 flex justify-start items-center")}
            size={"lg"}
            asChild
        >
            <Link href={`/workspace/${workspaceId}/member/${id}`} aria-label={`View ${label}'s profile`}>
                <div className="flex items-center gap-4 w-full">
                    {/* Avatar */}
                    <Avatar className="size-12 rounded-full shadow-md">
                        <AvatarImage src={image} alt={label} className="object-cover" />
                        <AvatarFallback className="bg-blue-500 text-white font-semibold text-lg">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    {/* Label */}
                    <span className="text-lg font-semibold truncate text-gray-900 dark:text-white">
                        {label}
                    </span>
                </div>
            </Link>
        </Button>
    );
};
