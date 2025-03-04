import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Navbar from "@/components/layouts/Navbar";
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const routes = ["/auth/login", "/auth/register"];
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      {!routes.includes(pathname) && <Navbar />}
      <Component {...pageProps} />;
    </SessionProvider>
  );
}
