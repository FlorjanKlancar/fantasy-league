import { Raleway } from "@next/font/google";
import React from "react";

const roboto = Raleway({
  weight: "500",
  style: ["normal"],
  subsets: ["latin"],
});

function LECHowToPlay() {
  return (
    <div
      className={`${roboto.className} order-first flex flex-col space-y-6 pb-5 sm:order-last sm:pt-14`}
    >
      <div>
        <h2 className="my-2 text-xl text-white">How does it work</h2>
        <p className="text-sm text-slate-400">
          The fantasy league teams standings picker app allows users to select
          their desired order of teams for an upcoming tournament, and then
          locks in their picks. After the tournament, the app calculates the
          actual standings of the teams and awards points to users based on the
          accuracy of their picks.
        </p>
      </div>

      <div>
        <h2 className="my-2 text-xl text-white">About the tournament</h2>
        <p className="text-sm text-slate-400">
          Compare your predictions with other players and see how they stack up
          against the competition. Share your predictions with friends and
          challenge them to beat your standings. The winner takes it all.
        </p>
      </div>
    </div>
  );
}

export default LECHowToPlay;
