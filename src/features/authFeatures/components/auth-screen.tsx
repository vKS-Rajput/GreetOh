"use client";

import { useState } from "react";
import { SingInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
    const [state, setState] = useState<SingInFlow>("signIn")
    return(
        <div className="h-full flex items-center justify-center bg-gradient-to-br from-[#ff9a9e] via-[#7067d4] to-[#c159ea]">
            {state === "signIn" ? <SignInCard/> : <SignUpCard/>}
        </div>
    )
}
