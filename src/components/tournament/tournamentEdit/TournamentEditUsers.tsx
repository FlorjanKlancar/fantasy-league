import type {
  tournaments,
  users_on_tournament,
  user_data,
} from "@prisma/client";
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import Modal from "../../Modal";
import TournamentParticipantsSkeleton from "../../skeletons/TournamentParticipantsSkeleton";
import RemoveTournamentUserModal from "./DeleteTournamentUserModal";
import EditUserRow from "./EditUserRow";

type Props = {
  tournamentId: string;
  userId: string;
};

function TournamentEditUsers({ tournamentId, userId }: Props) {
  const [open, setOpen] = useState(false);
  const [removeUser, setRemoveUser] = useState<
    users_on_tournament & {
      user_data: user_data;
      tournaments: tournaments;
    }
  >();
  const { data: participantsData, isLoading } =
    trpc.users.getUsersOnTournament.useQuery({
      tournamentId,
    });

  if (isLoading || !participantsData)
    return <TournamentParticipantsSkeleton numberOfRows={3} />;

  return (
    <div className="overflow-hidden rounded border-2 border-primary/20 bg-slate-800 sm:rounded-md">
      <div className="flex justify-between bg-slate-900 p-4 text-sm font-bold	uppercase leading-4">
        <h2>Participants</h2>
      </div>
      <ul role="list" className="divide-y divide-slate-600">
        {participantsData.map((participant, i: number) => (
          <EditUserRow
            key={i}
            participant={participant}
            userId={userId}
            setOpen={setOpen}
            setRemoveUser={setRemoveUser}
          />
        ))}
      </ul>

      {removeUser && (
        <Modal open={open} setOpen={setOpen}>
          <RemoveTournamentUserModal
            removeUser={removeUser}
            setOpen={setOpen}
          />
        </Modal>
      )}
    </div>
  );
}

export default TournamentEditUsers;
