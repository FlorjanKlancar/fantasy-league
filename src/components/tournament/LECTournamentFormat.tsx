import React from "react";
import LECTable from "../table/LECTable";
import TournamentParticipants from "./TournamentParticipants";

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
        <div className="">
          <h2 className="text my-2 uppercase text-white">HOW DOES IT WORK</h2>
          <p className="text-sm text-slate-400">
            you have the power to easily move teams and players around, creating
            your own predictions for how the tournament will play out. Our
            intuitive interface makes it simple for you to visualize your
            predictions and make adjustments as needed. You can play around with
            different scenarios, placing teams and players in different
            positions to see how it affects the final standings. The ability to
            drag and drop teams and players is a fast and easy way to make
            predictions and have fun while doing it.
          </p>
          <h2 className="my-2 uppercase text-white ">About the tournament</h2>
          <p className="text-sm text-slate-400">
            Compare your predictions with other players and see how they stack
            up against the competition. Share your predictions with friends and
            challenge them to beat your standings. The winner takes it all.
          </p>
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
