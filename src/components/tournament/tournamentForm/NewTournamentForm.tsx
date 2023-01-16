import { useState } from "react";
import { TournamentForm } from "../../../types/tournamentFormTypes";
import { trpc } from "../../../utils/trpc";
import TournamentDetailsForm from "./TournamentDetailsForm";
import TournamentInvitesForm from "./TournamentInvitesForm";

type Props = {
  userId: string;
};

export default function NewTournamentForm({ userId }: Props) {
  const [showInviteComponent, setShowInviteComponent] = useState(false);
  const [tournamentId, setTournamentId] = useState("");

  //const createTournamentMutation = trpc.tournament.

  const createNewTournament = async (tournamentData: TournamentForm) => {
    console.log({ tournamentData });

    setTournamentId("newId");
    setShowInviteComponent(true);

    //mutate and show invite component
  };

  return (
    <div className="mt-12">
      {!showInviteComponent ? (
        <TournamentDetailsForm createNewTournament={createNewTournament} />
      ) : (
        <TournamentInvitesForm userId={userId} tournamentId={tournamentId} />
      )}
    </div>
  );
}
