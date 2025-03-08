import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { GiAstronautHelmet, GiRobotGolem } from "react-icons/gi";
import { IoMdPlanet } from "react-icons/io";
import { motion } from "framer-motion";
import { SignInFlow } from "../types";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions();
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const handleProviderSignUp = (provider: "github" | "google" | "facebook") => {
        signIn(provider);
    };

    const handlePasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate password and confirm password
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setPending(true);
        setError("");
        signIn("password", {name ,email, password, flow: "signUp"})
        .catch(()=> {
            setError("Something went wrong! Please try Again")
        })
        .finally(()=> {
            setPending(false)
        })
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#ff9a9e] to-[#fad0c4] px-4">
            <motion.div
                className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Left Side - Animated Cartoon Character */}
                <div className="w-full md:w-1/2 bg-[#ffeded] flex flex-col justify-center items-center p-6 md:p-8 space-y-4 md:space-y-6 relative overflow-hidden">
                    {/* Floating Astronaut */}
                    <motion.div
                        className="relative"
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <GiAstronautHelmet className="text-[#ff6384] text-7xl md:text-9xl drop-shadow-lg" />
                        <GiRobotGolem className="absolute -top-4 -left-6 md:-left-8 text-[#ffc107] text-4xl md:text-5xl animate-pulse" />
                        <IoMdPlanet className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 text-[#9c27b0] text-4xl md:text-5xl animate-spin-slow" />
                    </motion.div>

                    {/* Floating Stars */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                opacity: [0, 1, 0],
                                scale: [0.5, 1.5, 0.5],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}

                    <p className="text-lg md:text-xl font-semibold text-gray-700 text-center">
                        Your Secure Space Awaits!
                    </p>
                </div>

                {/* Right Side - Sign Up Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-10">
                    <Card className="w-full bg-transparent border-none">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-800">
                                Sign Up
                            </CardTitle>
                            <CardDescription className="text-gray-500 text-sm md:text-lg">
                                Welcome! Register to create your account
                            </CardDescription>
                        </CardHeader>
                        {!!error && (
                            <div className="bg-destructive/15 p-3 items-center rounded-md flex gap-x-2 text-sm text-destructive mb-6">
                                <TriangleAlert className="size-5" />
                                <p>{error}</p>
                            </div>
                        )}
                        <CardContent className="space-y-4 md:space-y-6">
                            <form onSubmit={handlePasswordSignUp} className="space-y-4 md:space-y-6">

                                 {/* Name Input */}
                                 <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <Input
                                        disabled={pending}
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-5 py-3 md:py-4 pl-12 md:pl-14 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 shadow-md focus:ring-2 focus:ring-[#ff6384] text-base md:text-lg"
                                    />
                                    <FiUser className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                </motion.div>
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
                                        className="w-full px-5 py-3 md:py-4 pl-12 md:pl-14 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 shadow-md focus:ring-2 focus:ring-[#ff6384] text-base md:text-lg"
                                    />
                                    <FiMail className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
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
                                        className="w-full px-5 py-3 md:py-4 pl-12 md:pl-14 pr-12 md:pr-14 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 shadow-md focus:ring-2 focus:ring-[#ff6384] text-base md:text-lg"
                                    />
                                    <FiLock className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-4 md:right-5 flex items-center text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </motion.div>

                                {/* Confirm Password Input */}
                                <motion.div
                                    className="relative"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6, duration: 0.5 }}
                                >
                                    <Input
                                        disabled={pending}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-5 py-3 md:py-4 pl-12 md:pl-14 pr-12 md:pr-14 rounded-lg bg-white text-gray-800 placeholder-gray-400 border border-gray-300 shadow-md focus:ring-2 focus:ring-[#ff6384] text-base md:text-lg"
                                    />
                                    <FiLock className="absolute left-4 md:left-5 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-4 md:right-5 flex items-center text-gray-500 hover:text-gray-700 hover:cursor-pointer"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </motion.div>

                                {/* Sign Up Button */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                >
                                    <Button
                                        type="submit"
                                        disabled={pending}
                                        className="w-full bg-gradient-to-r from-[#ff6384] to-[#ff4b2b] text-white py-3 md:py-4 text-lg md:text-xl font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                                        size="lg"
                                    >
                                        {pending ? "Signing Up..." : "Sign Up"}
                                    </Button>
                                </motion.div>
                            </form>

                            {/* Social Media Login */}
                            <motion.div
                                className="flex justify-center space-x-4 md:space-x-6 mt-4 md:mt-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.5 }}
                            >
                                <FaGoogle
                                    onClick={() => handleProviderSignUp("google")}
                                    className="text-gray-600 text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform"
                                />
                                <FaFacebook
                                    onClick={() => handleProviderSignUp("facebook")}
                                    className="text-blue-600 text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform"
                                />
                                <FaGithub
                                    onClick={() => handleProviderSignUp("github")}
                                    className="text-black text-3xl md:text-4xl cursor-pointer hover:scale-110 transition-transform"
                                />
                            </motion.div>

                            <p>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setState("signIn")}
                                    className="text-sky-700 hover:underline cursor-pointer font-bold"
                                >
                                    Sign In
                                </span>
                            </p>
                        </CardContent>
                    </Card> 
                </div>
            </motion.div>
        </div>
    );
};