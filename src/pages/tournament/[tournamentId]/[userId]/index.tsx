import { useRouter } from "next/router";
import React from "react";
import { TournamentLayout } from "../../../../components/layout/TournamentLayout";
import LECTable from "../../../../components/table/LECTable";
import LECHowToPlay from "../../../../components/tournament/LEC/LECHowToPlay";
import TournamentParticipants from "../../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../../components/tournament/TournamentPrizes";

function SpecificUserPicks() {
  const router = useRouter();

  const { tournamentId, userId } = router.query;

  if (!tournamentId || !userId) return;

  return (
    <TournamentLayout
      userId={userId.toString()}
      tournamentId={tournamentId.toString()}
    >
      <div className="grid grid-cols-1 gap-14 px-4 pt-5 lg:grid-cols-2 lg:gap-[100px] lg:px-0">
        <div className="flex flex-col space-y-5">
          <TournamentParticipants tournamentId={tournamentId!.toString()} />

          <LECHowToPlay />
        </div>

        <LECTable
          userId={userId.toString()}
          tournamentId={tournamentId!.toString()}
        />
      </div>
    </TournamentLayout>
  );
}

export default SpecificUserPicks;
