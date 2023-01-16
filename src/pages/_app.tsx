import {
  SessionContextProvider,
  useSession,
} from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import AuthComponent from "../components/AuthComponent";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { supabaseClient } from "../utils/supabaseClient";

type MyAppProps = {
  Component: React.ComponentType<NextPage>;
  pageProps: any;
};

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const session = useSession();

  return !session ? <AuthComponent /> : <Component {...pageProps} />;
};

function MyAppWithProvider({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <DefaultLayout>
        <MyApp Component={Component} pageProps={pageProps} />
        <Toaster
          toastOptions={{
            className: "bg-slate-900",
            style: {
              color: "#e2e8f0",
              backgroundColor: "#475569",
            },
          }}
        />
        <Analytics />
      </DefaultLayout>
    </SessionContextProvider>
  );
}

export default trpc.withTRPC(MyAppWithProvider);
