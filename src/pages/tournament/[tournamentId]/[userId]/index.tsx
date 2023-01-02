import { useRouter } from "next/router";
import React from "react";
import LECTable from "../../../../components/table/LECTable";
import TournamentHeader from "../../../../components/tournament/TournamentHeader";
import TournamentParticipants from "../../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../../components/tournament/TournamentPrizes";

type Props = {};

function SpecificUserPicks({}: Props) {
  const router = useRouter();

  const { tournamentId, userId } = router.query;

  if (!tournamentId || !userId) return;

  return (
    <>
      <TournamentHeader tournamentId={tournamentId!.toString()} />

      <div className="grid auto-rows-fr grid-cols-1 px-4 md:grid-cols-2 md:gap-[100px] md:px-0">
        <div className="flex flex-col">
          <TournamentParticipants tournamentId={tournamentId!.toString()} />

          <TournamentPrizes />
        </div>

        <LECTable
          userId={userId.toString()}
          setSubmitData={() => {}}
          tournamentId={tournamentId!.toString()}
        />
      </div>
    </>
  );
}

export default SpecificUserPicks;
