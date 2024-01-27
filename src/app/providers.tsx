"use client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { PropsWithChildren } from "react";
export function Providers({ children }: PropsWithChildren) {
  return <UserProvider>{children}</UserProvider>;
}
