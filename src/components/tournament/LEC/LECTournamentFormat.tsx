import React from "react";
import LECTable from "../../table/LECTable";
import TournamentParticipants from "../TournamentParticipants";
import { Raleway } from "@next/font/google";

// If loading a variable font, you don't need to specify the font weight
const roboto = Raleway({
  weight: "500",
  style: ["normal"],
  subsets: ["latin"],
});

type Props = {
  setSubmitData: (data: unknown) => void;
  tournamentId: string;
  userId: string;
};

function LECTournamentFormat({ setSubmitData, tournamentId, userId }: Props) {
  return (
    <div className="grid grid-cols-1 gap-14 px-4 pt-5 lg:grid-cols-2 lg:gap-[100px] lg:px-0">
      <div className="flex flex-col space-y-5">
        <TournamentParticipants tournamentId={tournamentId} />
        <div className={`${roboto.className} flex flex-col space-y-6 pt-14`}>
          <div>
            <h2 className="my-2 text-xl text-white">How does it work</h2>
            <p className="text-sm text-slate-400">
              The fantasy league teams standings picker app allows users to
              select their desired order of teams for an upcoming tournament,
              and then locks in their picks. After the tournament, the app
              calculates the actual standings of the teams and awards points to
              users based on the accuracy of their picks.
            </p>
          </div>

          <div>
            <h2 className="my-2 text-xl text-white">About the tournament</h2>
            <p className="text-sm text-slate-400">
              Compare your predictions with other players and see how they stack
              up against the competition. Share your predictions with friends
              and challenge them to beat your standings. The winner takes it
              all.
            </p>
          </div>
        </div>
      </div>

      <LECTable
        userId={userId}
        setSubmitData={setSubmitData}
        tournamentId={tournamentId}
      />
    </div>
  );
}

export default LECTournamentFormat;
