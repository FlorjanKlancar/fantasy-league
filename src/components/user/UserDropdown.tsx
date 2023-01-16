import React from "react";
import { trpc } from "../../utils/trpc";
import Select from "react-select";
import { MultiValue } from "react-select/dist/declarations/src";
import DropdownSkeleton from "../skeletons/DropdownSkeleton";
import { tournaments, users_on_tournament, user_data } from "@prisma/client";

type Props = {
  setInviteSelections: (
    selections: MultiValue<{ label: string; value: string }>
  ) => void;
  tournamentId?: string;
};

function UserDropdown({ setInviteSelections, tournamentId }: Props) {
  const { data, isLoading } = trpc.users.getUserByName.useQuery();
  const { data: usersOnTournament, isLoading: isLoad } = tournamentId
    ? trpc.users.getUsersOnTournament.useQuery(
        { tournamentId: tournamentId },
        { enabled: !!tournamentId }
      )
    : trpc.users.getAllUsers.useQuery();

  if (isLoading || !data || isLoad || !usersOnTournament)
    return <DropdownSkeleton />;

  const notOnTournamentList = tournamentId
    ? data
        .filter(
          (user) =>
            !(
              usersOnTournament as (users_on_tournament & {
                user_data: user_data;
                tournaments: tournaments;
              })[]
            ).some((tournamentUser) => {
              return user.id === tournamentUser.userId;
            })
        )
        .map((user) => {
          return {
            label: user.full_name ?? user.email!,
            value: user.id,
          };
        })
    : (usersOnTournament as user_data[]).map((user) => {
        return {
          label: user.full_name ?? user.email!,
          value: user.id,
        };
      });

  return (
    <Select
      isMulti
      options={notOnTournamentList}
      className="my-react-select-container w-full"
      classNamePrefix="my-react-select"
      onChange={(selections) => setInviteSelections(selections)}
    />
  );
}

export default UserDropdown;
