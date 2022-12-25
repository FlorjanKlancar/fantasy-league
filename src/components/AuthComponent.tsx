import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useState } from "react";
import Button from "../components/Button";
import Modal from "./Modal";

export default function AuthComponent() {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const [open, setOpen] = useState(false);

  return (
    <>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-48 sm:pb-40 ">
            <h1 className="h-24 text-8xl font-extrabold tracking-tight sm:text-center sm:text-6xl ">
              Custom{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-sky-600 underline-offset-[20px]">
                Fantasy
              </span>{" "}
              League
            </h1>

            <p className="mt-6 text-lg leading-8 sm:text-center">
              Welcome to our fantasy league site! Create and manage your own
              team, compete against other players, and track your progress
              throughout the season. Join us and see if you have what it takes
              to become the ultimate champion!
            </p>
            <div className="mt-8 flex gap-x-4 sm:justify-center">
              <Button
                buttonSize="md"
                buttonType="primary"
                onClick={() => setOpen(true)}
              >
                Start Now!
              </Button>
            </div>
          </div>
        </div>
        <Modal open={open} setOpen={setOpen}>
          <Auth
            providers={["google", "github", "discord", "twitter"]}
            socialLayout="horizontal"
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: "#4f46e5",
                    brandAccent: "#4f46e5",

                    defaultButtonBackground: "black",
                  },
                },
              },
            }}
            theme="dark"
          />
        </Modal>
      </main>
    </>
  );
}
