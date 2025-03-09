import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Doc } from "../../../convex/_generated/dataModel";
import { ChevronDown, UserPlus, Settings, SquarePen, ListFilter } from "lucide-react";
import { Hint } from "@/components/hint";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 h-[49px] bg-white border-b border-gray-200">
      {/* Workspace Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            className="font-semibold text-black text-lg p-2 flex items-center space-x-2 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            <span className="truncate max-w-[120px] sm:max-w-[160px]">
              {workspace.name}
            </span>
            <ChevronDown className="size-4 shrink-0 opacity-70" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 bg-white rounded-lg shadow-lg border border-gray-100 mt-1 p-1.5 space-y-1 animate-in fade-in zoom-in-95"
        >
          <DropdownMenuItem className="flex items-center p-2 space-x-3 hover:bg-gray-100 rounded-md cursor-pointer focus:bg-gray-100 focus:outline-none">
            <div className="size-8 flex-shrink-0 bg-[#616061] text-white font-semibold text-lg rounded-md flex items-center justify-center">
              {workspace.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm">{workspace.name}</p>
              <p className="text-xs text-gray-500">Active Workspace</p>
            </div>
          </DropdownMenuItem>
          {isAdmin && (
            <>
              <DropdownMenuSeparator className="border-t border-gray-100" />
              <DropdownMenuItem
                className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md cursor-pointer focus:bg-gray-100 focus:outline-none"
                onClick={() => {}}
              >
                <UserPlus className="size-4 text-gray-600" />
                <span className="text-sm">Invite People</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-t border-gray-100" />
              <DropdownMenuItem
                className="flex items-center p-2 space-x-2 hover:bg-gray-100 rounded-md cursor-pointer focus:bg-gray-100 focus:outline-none"
                onClick={() => {}}
              >
                <Settings className="size-4 text-gray-600" />
                <span className="text-sm">Preferences</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <Hint label="New Message" side="bottom" align="center">
          <Button
            variant={"ghost"}
            size={"iconSm"}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="New Message"
          >
            <SquarePen className="size-4 text-gray-600" />
          </Button>
        </Hint>

        <Hint label="Filter" side="bottom" align="center">
          <Button
            variant={"ghost"}
            size={"iconSm"}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Filter"
          >
            <ListFilter className="size-4 text-gray-600" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};