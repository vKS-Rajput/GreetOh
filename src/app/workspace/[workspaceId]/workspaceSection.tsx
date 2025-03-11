import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useToggle } from "react-use";
import { FaCaretDown } from "react-icons/fa";

interface WorkspaceSectionProps {
    children: React.ReactNode;
    label: string;
    hint: string;
    count?: number; // Optional: Number of items (e.g., channels)
    onNew?: () => void;
}

export const WorkspaceSection = ({ children, label, hint, count, onNew }: WorkspaceSectionProps) => {
    const [isExpanded, toggle] = useToggle(true);
    

    return (
        <div className="space-y-2 w-full">
            {/* Header Section */}
            <div className="flex items-center justify-between p-3 bg-gray-700 dark:bg-gray-800 rounded-lg group hover:bg-gray-750 dark:hover:bg-gray-700 transition-colors">
                {/* Left Side: Label, Caret, and Count */}
                <div className="flex items-center gap-2"  onClick={toggle}>
                    <Button
                        variant="transparent"
                        size="icon"
                        className="p-1 text-sm text-muted-foreground hover:text-foreground"
                        aria-label="Toggle section"
                       
                    >
                        <FaCaretDown
                            className={`size-5 transition-transform ${isExpanded ? "" : "-rotate-90"}`}
                        />
                    </Button>
                    <Button
                        variant="transparent"
                        size="sm"
                        className="px-2 text-sm text-muted-foreground text-white hover:text-foreground truncate"
                        aria-label={label}
                    >
                        {label}
                        {count !== undefined && (
                            <span className="ml-2 text-xs bg-gray-700 dark:bg-gray-700 text-white dark:text-gray-300 px-2 py-1 rounded-full">
                                {count}
                            </span>
                        )}
                    </Button>
                </div>

                {/* Right Side: Add Button with Hint */}
                {onNew && (
                    <Hint label={hint} side="top" align="center">
                        <Button
                            onClick={onNew}
                            variant="transparent"
                            size="icon"
                            className="p-1 text-sm text-muted-foreground  bg-gray-700 to-purple-500 hover:text-white rounded-lg"
                            aria-label={hint}
                        >
                            <PlusIcon className="size-5" />
                        </Button>
                    </Hint>
                )}
            </div>

            {/* Children (Content) */}
            <div
                className={`px-3.5 overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                {children}
            </div>
        </div>
    );
};