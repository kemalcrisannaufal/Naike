/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { ToasterProvider } from "@/contexts/ToasterContext";
import AppShell from "@/components/fragments/AppShell";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  }, [toaster]);

  return (
    <SessionProvider session={session}>
      <ToasterProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ToasterProvider>
    </SessionProvider>
  );
}
