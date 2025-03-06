"use client";

import { useState } from "react";
import { SingInFlow } from "../types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
    const [state, setState] = useState<SingInFlow>("signIn")
    return(
        <div className="h-full flex items-center justify-center bg-[#71429b]">
            {state === "signIn" ? <SignInCard/> : <SignUpCard/>}
        </div>

    )
} 