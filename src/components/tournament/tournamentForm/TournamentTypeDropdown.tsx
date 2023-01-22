import React from "react";
import { trpc } from "../../../utils/trpc";
import type { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  register: UseFormRegisterReturn<any>;
  isError: boolean;
};

function TournamentTypeDropdown({ register, isError }: Props) {
  const { data, isLoading } = trpc.tournament.getTournamentTypes.useQuery();

  if (isLoading || !data)
    return (
      <div className="skeleton_default_style h-[48px] w-full rounded-lg"></div>
    );

  const dropdownOptions = data.map((option) => (
    <option key={Number(option.id)} value={Number(option.id)}>
      {option.type}
    </option>
  ));

  return (
    <select
      className={`${
        isError ? "select-error" : "select-bordered"
      } select w-full font-normal`}
      {...register}
      defaultValue={0}
    >
      <option disabled value={0}>
        Pick Tournament Type
      </option>
      {dropdownOptions}
    </select>
  );
}

export default TournamentTypeDropdown;
