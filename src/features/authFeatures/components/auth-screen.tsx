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
        <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black">
            {/* Animated Gradient Background */}
            <motion.div 
                className="absolute inset-0"
                animate={{
                    background: [
                        "linear-gradient(135deg, #ff9a9e, #fad0c4, #fbc2eb)",
                        "linear-gradient(135deg, #a1c4fd, #c2e9fb, #fbc2eb)",
                        "linear-gradient(135deg, #f6d365, #fda085, #fbc2eb)",
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
                    className="absolute w-16 h-16 rounded-full backdrop-blur-md"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.2)`,
                        borderRadius: `${Math.random() * 50}%`,
                    }}
                    animate={{
                        opacity: [0.3, 1, 0.3],
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
            <div className="relative z-10">
                {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
            </div>

            {/* Security Info */}
            <div className="absolute bottom-6 flex gap-4 text-white text-sm z-10">
                <div className="flex items-center gap-1">
                    <FiLock className="text-lg" /> <span>Secured Connection</span>
                </div>
                <div className="flex items-center gap-1">
                    <FiShield className="text-lg" /> <span>End-to-End Encryption</span>
                </div>
            </div>
        </div>
    );
};