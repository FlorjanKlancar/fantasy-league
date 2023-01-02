import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  useSession,
} from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useState } from "react";
import { trpc } from "../utils/trpc";
import "../styles/globals.css";
import AuthComponent from "../components/AuthComponent";
import { DefaultLayout } from "../components/layout/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const MyApp = ({ Component, pageProps }: any) => {
  const session = useSession();

  return !session ? <AuthComponent /> : <Component {...pageProps} />;
};

function MyAppWithProvider({ Component, pageProps }: AppProps) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
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
