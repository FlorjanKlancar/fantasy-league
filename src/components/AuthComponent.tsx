import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import { supabaseClient } from "../utils/supabaseClient";
import Modal from "./Modal";

export default function AuthComponent() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  return (
    <>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-32 sm:pt-48 sm:pb-40 ">
            <h1 className="text-center text-7xl	font-extrabold leading-tight tracking-tight sm:text-center sm:text-6xl ">
              Custom{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent underline decoration-sky-600 underline-offset-[10px] md:underline-offset-[20px]">
                Fantasy
              </span>{" "}
              League
            </h1>

            <p className="mt-12 text-center text-base sm:text-center md:mt-10 md:text-lg md:leading-8">
              Welcome to our fantasy league site! Create and manage your own
              team, compete against other players, and track your progress
              throughout the season. Join us and see if you have what it takes
              to become the ultimate champion!
            </p>
            <div className="mt-8 flex justify-center gap-x-4">
              <button
                className="btn-md btn bg-primary text-white hover:bg-primary/60"
                onClick={() => setOpen(true)}
              >
                Start Now!
              </button>
            </div>
          </div>
        </div>
        <Modal open={open} setOpen={setOpen}>
          <Auth
            providers={["google", "discord", "twitter"]}
            socialLayout="horizontal"
            supabaseClient={supabaseClient}
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
            redirectTo={location}
            theme="dark"
          />
        </Modal>
      </main>
    </>
  );
}
