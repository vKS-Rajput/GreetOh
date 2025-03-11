"use client";

import { useState } from "react";
import { FiLock, FiShield } from "react-icons/fi";
import { SignInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { motion } from "framer-motion";

export const AuthScreen = () => {
    const [state, setState] = useState<SignInFlow>("signIn");

    return (
        <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
            {/* Animated Gradient Background */}
            <motion.div 
                className="absolute inset-0"
                animate={{
                    background: [
                        "linear-gradient(135deg, #1e1e2f, #2a2a40, #3a3a5a)",
                        "linear-gradient(135deg, #2a2a40, #3a3a5a, #1e1e2f)",
                        "linear-gradient(135deg, #3a3a5a, #1e1e2f, #2a2a40)",
                    ],
                    backgroundSize: "300% 300%",
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Shapes */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full backdrop-blur-md"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        backgroundColor: `rgba(${Math.random() * 55 + 200}, ${Math.random() * 55 + 200}, ${Math.random() * 55 + 200}, 0.1)`,
                        borderRadius: `${Math.random() * 50}%`,
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.8, 1.2, 0.8],
                        x: [0, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, 0],
                        rotate: [0, Math.random() * 360, 0],
                    }}
                    transition={{
                        duration: Math.random() * 5 + 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Auth Card (Sign In / Sign Up) */}
            <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl px-4">
                {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
            </div>

            {/* Security Info */}
            <div className="absolute bottom-4 sm:bottom-6 flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-300 text-xs sm:text-sm z-10 px-4 text-center sm:text-left">
                <div className="flex items-center gap-1">
                    <FiLock className="text-sm sm:text-lg" /> <span>Secured Connection</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiShield className="text-sm sm:text-lg" /> <span>End-to-End Encryption</span>
                </div>
            </div>
        </div>
    );
};