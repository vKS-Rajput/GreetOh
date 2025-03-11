import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Corrected import
import { Doc } from "../../../convex/_generated/dataModel";
import { ChevronDown, UserPlus, Settings, SquarePen, ListFilter } from "lucide-react";
import { Hint } from "@/components/hint";
import { PreferencesModel } from "./preferences-model";
import { useState } from "react";

interface WorkspaceHeaderProps {
  workspace: Doc<"workspaces">;
  isAdmin: boolean;
}

export const WorkspaceHeader = ({ workspace, isAdmin }: WorkspaceHeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Preferences Modal */}
      <PreferencesModel
        open={open}
        setOpen={setOpen}
        initialValue={workspace.name}
      />

      {/* Workspace Header */}
      <div
        className="flex items-center justify-between px-4 py-2 h-[49px] border-b border-gray-700"
        style={{
          background: "rgba(30, 30, 47, 0.7)", // Semi-transparent dark background
          backdropFilter: "blur(10px)", // Frosted glass effect
        }}
      >
        {/* Workspace Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"ghost"}
              className="font-semibold text-white text-lg p-2 flex items-center space-x-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Workspace Dropdown"
            >
              <span className="truncate max-w-[120px] sm:max-w-[160px]">
                {workspace.name}
              </span>
              <ChevronDown className="size-4 shrink-0 opacity-70 text-gray-300" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 bg-gray-900/95 text-white rounded-lg shadow-lg border border-gray-700 mt-1 p-1.5 space-y-1 animate-in fade-in zoom-in-95"
            style={{
              backdropFilter: "blur(10px)", // Frosted glass effect
            }}
          >
            <DropdownMenuItem className="flex items-center p-2 space-x-3 hover:bg-gray-700/50 rounded-md cursor-pointer focus:bg-gray-700/50 focus:outline-none">
              <div className="size-8 flex-shrink-0 bg-gray-600 text-white font-semibold text-lg rounded-md flex items-center justify-center">
                {workspace.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <p className="font-bold text-sm">{workspace.name}</p>
                <p className="text-xs text-gray-400">Active Workspace</p>
              </div>
            </DropdownMenuItem>
            {isAdmin && (
              <>
                <DropdownMenuSeparator className="border-t border-gray-700" />
                <DropdownMenuItem
                  className="flex items-center p-2 space-x-2 hover:bg-gray-700/50 rounded-md cursor-pointer focus:bg-gray-700/50 focus:outline-none"
                  onClick={() => {}}
                >
                  <UserPlus className="size-4 text-gray-300" />
                  <span className="text-sm">Invite People</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-t border-gray-700" />
                <DropdownMenuItem
                  className="flex items-center p-2 space-x-2 hover:bg-gray-700/50 rounded-md cursor-pointer focus:bg-gray-700/50 focus:outline-none"
                  onClick={() => setOpen(true)}
                >
                  <Settings className="size-4 text-gray-300" />
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
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="New Message"
            >
              <SquarePen className="size-4 text-gray-300" />
            </Button>
          </Hint>

          <Hint label="Filter" side="bottom" align="center">
            <Button
              variant={"ghost"}
              size={"iconSm"}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-label="Filter"
            >
              <ListFilter className="size-4 text-gray-300" />
            </Button>
          </Hint>
        </div>
      </div>
    </>
  );
};