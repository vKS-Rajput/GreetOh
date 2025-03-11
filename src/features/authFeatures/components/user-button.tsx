"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { useCurrentUser } from "../api/use-current-user";
import { Loader, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useAuthActions } from "@convex-dev/auth/react";

export const UserButton = () => {
    const { data, isLoading } = useCurrentUser();
    const { signOut } = useAuthActions();

    if (isLoading) {
        return <Loader className="size-5 animate-spin text-gray-400" />;
    }

    if (!data) {
        return null;
    }

    const { image, name, email } = data;
    const avatarFallback = name ? name.charAt(0).toUpperCase() : "U"; // Default to "U" if no name

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative cursor-pointer">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="p-1 rounded-full border border-[#ff6384] bg-[#ff6384]/10 shadow-sm hover:bg-[#ff6384]/20 transition"
                >
                    <Avatar className="size-6">
                        <AvatarImage src={image} alt={name || "User"} />
                        <AvatarFallback className="text-[#ff6384] font-bold text-lg">
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="center"
                side="right"
                className="w-64 bg-white shadow-md rounded-lg border border-gray-200 p-3"
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* User Info */}
                    <DropdownMenuItem className="flex flex-col items-start p-2">
                        <p className="font-medium text-gray-900">{name}</p>
                        <p className="text-sm text-gray-500">{email}</p>
                    </DropdownMenuItem>

                    <div className="border-t my-2" />

                    {/* Logout Button (Styled with a vibrant color) */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        className="flex items-center justify-center p-2 text-[#ff4b2b] cursor-pointer bg-[#ff4b2b]/10 hover:bg-[#ff4b2b]/20 border border-[#ff4b2b] rounded-lg"
                        onClick={() => signOut()}
                    >
                        <LogOut className="size-5 mr-2" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </motion.div>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};