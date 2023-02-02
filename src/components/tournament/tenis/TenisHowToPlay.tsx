import { Raleway } from "@next/font/google";
import React from "react";

const roboto = Raleway({
  weight: "500",
  style: ["normal"],
  subsets: ["latin"],
});

function TenisHowToPlay() {
  return (
    <div
      className={`${roboto.className} order-first flex flex-col space-y-6 pb-5 sm:order-last sm:pt-14`}
    >
      <div>
        <h2 className="my-2 text-xl text-white">How does it work</h2>
        <p className="text-sm text-slate-400">
          An app for selecting and predicting tennis players in a tournament
          works by allowing users to choose 10 players and lock in their
          choices. The app then tracks the players&quot; progress and updates
          the user&quot;s score based on the accuracy of their predictions. The
          user with the highest score at the end of the tournament wins. This
          app operates on the principles of fantasy sports and prediction
          markets.
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

export default TenisHowToPlay;
