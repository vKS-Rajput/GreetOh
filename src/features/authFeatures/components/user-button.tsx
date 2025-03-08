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
        return <Loader className="size-5 animate-spin text-muted-foreground" />;
    }

    if (!data) {
        return null;
    }

    const { image, name, email } = data;

    const avatarFallback = name ? name.charAt(0).toUpperCase() : "U"; // Fallback to "U" if name is undefined

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="outline-none relative">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }} // Bouncy hover effect
                    whileTap={{ scale: 0.9 }} // Tap effect
                    transition={{ type: "spring", stiffness: 300, damping: 10 }} // Spring animation
                >
                    <Avatar className="size-10 hover:opacity-75 transition">
                        <AvatarImage src={image} alt={name || "User"} />
                        <AvatarFallback className="bg-gradient-to-r from-[#eb738d] to-[#e788a2] text-[#f184ed] font-bold text-2xl shadow-lg">
                            <motion.div
                                initial={{ scale: 0 }} // Initial animation state
                                animate={{ scale: 1 }} // Animate in
                                transition={{ type: "spring", stiffness: 300, damping: 10 }} // Spring animation
                                className="flex items-center justify-center w-full h-full"
                            >
                                {avatarFallback}
                            </motion.div>
                        </AvatarFallback>
                    </Avatar>
                </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="center"
                side="right"
                className="w-60 bg-white shadow-lg rounded-lg p-2 border border-gray-200"
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }} // Initial animation state
                    animate={{ opacity: 1, y: 0 }} // Animate in
                    transition={{ duration: 0.3 }} // Smooth transition
                >
                    <DropdownMenuItem className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-md">
                        <div className="flex flex-col space-y-1">
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-muted-foreground">{email}</p>
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.2 }} // Hover effect on the logout button
                            whileTap={{ scale: 0.9 }} // Tap effect
                            transition={{ type: "spring", stiffness: 300, damping: 10 }} // Spring animation
                            className="flex items-center space-x-2 cursor-pointer"
                            onClick={() => signOut()}
                        >
                            <LogOut className="size-6 text-red-500" /> {/* Larger logout icon */}
                        </motion.div>
                    </DropdownMenuItem>
                </motion.div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};