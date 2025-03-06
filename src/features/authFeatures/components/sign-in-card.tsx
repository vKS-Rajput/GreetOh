import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

export const SignInCard = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-br">
            <Card className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-lg border border-white/30 text-white">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-extrabold text-white">
                        Sign In
                    </CardTitle>
                    <CardDescription className="text-gray-200">
                        Enter your credentials to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <form className="space-y-5">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-white/50 border border-white/40 transition-all duration-200 focus:scale-105"
                            />
                            <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                        </div>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 pl-12 pr-12 rounded-lg bg-white/30 text-white placeholder-gray-200 focus:ring-2 focus:ring-white/50 border border-white/40 transition-all duration-200 focus:scale-105"
                            />
                            <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-4 flex items-center text-white hover:text-gray-300 hover:cursor-pointer"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-[#ff416c] to-[#ff4b2b] text-white py-3 text-lg font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:cursor-pointer"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};