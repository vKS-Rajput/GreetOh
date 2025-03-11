"use client";

import { Provider } from "jotai";

interface JyotaiProviderProps {
  children: React.ReactNode;
}

export function JyotaiProvider({ children }: JyotaiProviderProps) {
  return <Provider>{children}</Provider>;
}
