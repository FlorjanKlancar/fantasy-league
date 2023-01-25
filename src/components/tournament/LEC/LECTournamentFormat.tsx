import React from "react";
import LECTable from "../../table/LECTable";
import TournamentParticipants from "../TournamentParticipants";
import LECHowToPlay from "./LECHowToPlay";

type Props = {
  setSubmitData?: (data: unknown) => void;
  tournamentId: string;
  userId: string;
};

function LECTournamentFormat({ setSubmitData, tournamentId, userId }: Props) {
  return (
    <div className="grid grid-cols-1 gap-14 px-4 pt-5 lg:grid-cols-2 lg:gap-[100px] lg:px-0">
      <div className="flex flex-col space-y-5">
        <TournamentParticipants tournamentId={tournamentId} />
        <LECHowToPlay />
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
