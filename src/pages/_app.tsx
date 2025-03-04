import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const routes = ["/auth/login", "/auth/register"];
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      {!routes.includes(pathname) && <Navbar />}
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
