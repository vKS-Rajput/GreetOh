import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaApple, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const onPasswordSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);
        setError("");
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
                setError("Invalid email or password! Please try again");
            })
            .finally(() => {
                setPending(false);
            });
    };

    const handleProviderSignIn = (provider: "github" | "google" | "facebook") => {
        signIn(provider);
    };

    return (
        <div className="h-screen flex items-center justify-center p-4 sm:p-0">
            <motion.div
                className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Left Side - Vibble Logo Animation */}
                <div className="w-full md:w-1/2 bg-gray-700 flex flex-col justify-center items-center p-4 md:p-8 space-y-4 md:space-y-6 relative overflow-hidden">
                    {/* New Vibble Logo with Plus and Circles */}
                    <motion.div
                        className="logo flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Plus Sign */}
                        <motion.div
                            className="text-4xl font-bold mb-2"
                            animate={{
                                color: ["#ff6f61", "#6b5b95", "#ff6f61"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            +
                        </motion.div>

                        {/* Circle Rows */}
                        {[0, 1, 2].map((row) => (
                            <motion.div
                                key={row}
                                className="flex gap-4 mb-2"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.8, 1, 0.8],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: row * 0.3,
                                    ease: "easeInOut",
                                }}
                            >
                                {[0, 1].map((circle) => (
                                    <motion.div
                                        key={circle}
                                        className="w-5 h-5 bg-[#ff6f61] rounded-full"
                                        animate={{
                                            y: [0, -15, 0],
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 1.2,
                                            repeat: Infinity,
                                            delay: circle * 0.1 + row * 0.2,
                                            ease: "easeInOut",
                                        }}
                                    />
                                ))}
                            </motion.div>
                        ))}

                        {/* Vibble Text */}
                        <motion.div
                            className="text-4xl font-bold mt-4"
                            animate={{
                                color: ["#ff6f61", "#6b5b95", "#ff6f61"],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            GreetOh!
                        </motion.div>
                    </motion.div>

                    <p className="text-sm md:text-xl font-semibold text-gray-300 text-center">
                        Your Secure Space Awaits!
                    </p>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-10">
                    <Card className="w-full bg-transparent border-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl md:text-4xl font-bold text-gray-100">
                                Login
                            </CardTitle>
                            <CardDescription className="text-gray-400 text-sm md:text-lg">
                                Pleasure to see you again!
                            </CardDescription>
                        </CardHeader>
                        {!!error && (
                            <div className="bg-destructive/15 p-3 items-center rounded-md flex gap-x-2 text-sm text-destructive mb-4 md:mb-6">
                                <TriangleAlert className="size-5" />
                                <p>{error}</p>
                            </div>
                        )}
                        <CardContent className="space-y-4 md:space-y-6">
                            <form onSubmit={onPasswordSignIn} className="space-y-4 md:space-y-6">
                                {/* Email Input */}
                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <Input
                                        disabled={pending}
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 md:px-5 py-2 md:py-3 pl-10 md:pl-12 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 shadow-md focus:ring-2 focus:ring-[#ff6384] text-sm md:text-base"
                                    />
                                    <FiMail className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                </motion.div>

                                {/* Password Input */}
                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <Input
                                        disabled={pending}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 md:px-5 py-2 md:py-3 pl-10 md:pl-12 pr-10 md:pr-12 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 border border-gray-600 shadow-md focus:ring-2 focus:ring-[#ff6384] text-sm md:text-base"
                                    />
                                    <FiLock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 md:right-4 flex items-center text-gray-400 hover:text-gray-300 hover:cursor-pointer"
                                    >
                                        {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </button>
                                </motion.div>

                                {/* Sign In Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={pending}
                                        className="w-full bg-gradient-to-r from-[#ff6384] to-[#ff4b2b] text-white py-2 md:py-3 text-sm md:text-lg font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                                        size="lg"
                                    >
                                        {pending ? "Signing In..." : "Sign In"}
                                    </Button>
                                </motion.div>
                            </form>

                            {/* Social Media Login */}
                            <motion.div
                                className="flex justify-center space-x-4 mt-4 md:mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                            >
                                <FaGoogle
                                    onClick={() => handleProviderSignIn("google")}
                                    className="text-gray-400 text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform hover:text-white"
                                />
                                <FaFacebook
                                    onClick={() => handleProviderSignIn("facebook")}
                                    className="text-blue-400 text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform hover:text-blue-300"
                                />
                                <FaGithub
                                    onClick={() => handleProviderSignIn("github")}
                                    className="text-gray-400 text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform hover:text-white"
                                />
                            </motion.div>

                            <p className="text-gray-400 text-sm md:text-base">
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setState("signUp")}
                                    className="text-sky-400 hover:underline cursor-pointer font-bold"
                                >
                                    Sign Up
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
};