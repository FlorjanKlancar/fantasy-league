import React from "react";
import TournamentHeader from "../../../../components/tournament/TournamentHeader";
import { useRouter } from "next/router";

function EditTournament() {
  const router = useRouter();
  const { tournamentId } = router.query;

  if (!tournamentId) return;

  return (
    <>
      <TournamentHeader tournamentId={tournamentId.toString()} />
      EDIT TOURNAMENT FIELDS
    </>
  );
}

export default EditTournament;
