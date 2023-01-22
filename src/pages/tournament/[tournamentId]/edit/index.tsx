import React from "react";
import { useRouter } from "next/router";
import { useSession } from "@supabase/auth-helpers-react";
import TournamentEditUsers from "../../../../components/tournament/tournamentEdit/TournamentEditUsers";
import { TournamentLayout } from "../../../../components/layout/TournamentLayout";

function EditTournament() {
  const router = useRouter();
  const session = useSession();
  const { tournamentId } = router.query;

  if (!tournamentId || !session) return;

  return (
    <TournamentLayout
      userId={session.user.id}
      tournamentId={tournamentId.toString()}
    >
      <div className="grid grid-cols-2">
        <TournamentEditUsers
          tournamentId={tournamentId.toString()}
          userId={session.user.id}
        />
      </div>
    </TournamentLayout>
  );
}

export default EditTournament;
