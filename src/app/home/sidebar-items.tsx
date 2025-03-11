import { Button } from "@/components/ui/button";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Icon, LucideIcon } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define the card variants using `cva`
const cardVariants = cva(
    "flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow",
    {
        variants: {
            variant: {
                default: "bg-gray-600 dark:bg-gray-800 text-gray-900 dark:text-white",
                active: "bg-gray-600 dark:bg-gray-700 text-gray-900 dark:text-white",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface SidebarItemProps {
    label: string;
    id: string;
    icon: LucideIcon | IconType;
    variant?: VariantProps<typeof cardVariants>["variant"];
}

export const SidebarItem = ({ label, id, icon: Icon, variant }: SidebarItemProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <Button
            asChild
            variant={"transparent"}
            size={"sm"}
            className={cn(cardVariants({ variant }), "w-full h-full")} // Use card-like styling
        >
            <Link href={`/workspace/${workspaceId}/channel/${id}`}>
                <Icon className="size-6 mb-2" /> {/* Increase icon size and add margin */}
                <span className="text-sm font-medium">{label}</span> {/* Adjust text styling */}
            </Link>
        </Button>
    );
};