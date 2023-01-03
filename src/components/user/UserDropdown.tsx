import React from "react";
import { trpc } from "../../utils/trpc";
import Select from "react-select";
import { MultiValue } from "react-select/dist/declarations/src";
import DropdownSkeleton from "../skeletons/DropdownSkeleton";

type Props = {
  setInviteSelections: (
    selections: MultiValue<{ label: string; value: string }>
  ) => void;
  tournamentId: string;
};

function UserDropdown({ setInviteSelections, tournamentId }: Props) {
  const { data, isLoading } = trpc.users.getUserByName.useQuery();
  const { data: usersOnTournament, isLoading: isLoad } =
    trpc.users.getUsersOnTournament.useQuery({ tournamentId: tournamentId });

  if (isLoading || !data || isLoad || !usersOnTournament)
    return <DropdownSkeleton />;

  const notOnTournamentList = data
    .filter(
      (user) =>
        !usersOnTournament.some((tournamentUser) => {
          return user.id === tournamentUser.userId;
        })
    )
    .map((user) => {
      return {
        label: user.full_name ?? user.email!,
        value: user.id,
      };
    });

  return (
    <Select
      isMulti
      options={notOnTournamentList}
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      onChange={(selections) => setInviteSelections(selections)}
    />
  );
}

export default UserDropdown;
