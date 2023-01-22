import dayjs from "dayjs";
import { useState } from "react";
import type { TournamentForm } from "../../../types/tournamentFormTypes";
import { trpc } from "../../../utils/trpc";
import TournamentDetailsForm from "./TournamentDetailsForm";
import TournamentInvitesForm from "./TournamentInvitesForm";

type Props = {
  userId: string;
};

export default function NewTournamentForm({ userId }: Props) {
  const [showInviteComponent, setShowInviteComponent] = useState(false);

  const createTournamentMutation =
    trpc.tournament.createNewTournament.useMutation();

  const createNewTournament = async (tournamentData: TournamentForm) => {
    await createTournamentMutation.mutate({
      tournamentName: tournamentData.tournamentName,
      tournamentDescription: tournamentData.tournamentDescription,
      tournamentOwnerId: userId,
      tournamentType: tournamentData.tournamentType,
      tournamentEndDate: dayjs(tournamentData.tournamentEndDate),
      tournamentTicket: tournamentData.tournamentTicket,
    });

    setShowInviteComponent(true);
  };

  return (
    <div className="mt-12">
      {!showInviteComponent ? (
        <TournamentDetailsForm
          createNewTournament={createNewTournament}
          isLoading={createTournamentMutation.isLoading}
        />
      ) : (
        createTournamentMutation.data && (
          <TournamentInvitesForm
            userId={userId}
            tournamentId={createTournamentMutation.data.id}
          />
        )
      )}
    </div>
  );
}
