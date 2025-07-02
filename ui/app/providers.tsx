"use client";

import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import * as React from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      defaults: "2025-05-24",
      capture_exceptions: true,
      debug: process.env.NODE_ENV === "development",
    });
  }, []);

  return (
    <SessionProvider>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>
          <PHProvider client={posthog}>{children}</PHProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
