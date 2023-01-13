import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  TournamentForm,
  TournamentFormSchema,
} from "../../../types/tournamentFormTypes";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "debounce";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import ReactSelect from "react-select";
import Image from "next/image";
import { trpc } from "../../../utils/trpc";
import { Combobox } from "@headlessui/react";

function TournamentDetailsForm(props: any) {
  const supabase = useSupabaseClient();

  const { data, isLoading } = trpc.tournament.getTournamentTypes.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    setError,
  } = useForm<TournamentForm>({
    mode: "onChange",
    resolver: zodResolver(TournamentFormSchema),
  });

  const onSubmit: SubmitHandler<TournamentForm> = (data) => {
    props.goToStep(2);
    props.setSteps(() =>
      props.steps.map((step: any) => {
        if (step.id === 1) {
          return {
            ...step,
            status: "Completed",
          };
        } else
          return {
            ...step,
          };
      })
    );
  };

  const onChangeDebounceHandler = async (searchString: string) => {
    if (!searchString) return;
    await trigger("tournamentName");

    const { data } = await supabase
      .from("tournaments")
      .select("*")
      .ilike("name", searchString);
    console.log({ data });

    if (data?.length)
      setError("tournamentName", {
        type: "custom",
        message: "Tournament with this name already exists!",
      });
  };

  const people = [
    "Durward Reynolds",
    "Kenton Towne",
    "Therese Wunsch",
    "Benedict Kessler",
    "Katelyn Rohan",
  ];
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase());
        });
  if (isLoading || !data) return <div>Loading</div>;

  const selectOptions = data.map((type) => {
    return {
      value: Number(type.id),
      label: type.type,
      image: type.logoImage,
    };
  });

  return (
    <div className="md:grid md:grid-cols-2 ">
      <div className="md:col-span-1">
        <div className="px-4 sm:px-0">
          <h3 className="text-lg font-medium capitalize leading-6 text-white">
            Tournament basic information
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>
      </div>
      <div className="mt-5 md:col-span-1 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-slate-800 px-4 py-5 sm:p-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold capitalize text-white">
                    Tournament name
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Fifa World Cup 2023"
                  className={`${
                    errors.tournamentName ? "input-error" : "input-bordered"
                  } input w-full placeholder:capitalize`}
                  {...register("tournamentName")}
                  onChange={debounce(
                    async (e: React.ChangeEvent<HTMLInputElement>) =>
                      onChangeDebounceHandler(e.target.value),
                    1000
                  )}
                  autoComplete={"off"}
                />
                {errors.tournamentName ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.tournamentName.message}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold capitalize text-white">
                    Tournament description
                  </span>
                  <span className="label-text text-xs">Optional</span>
                </label>
                <textarea
                  placeholder="Optional tournament description"
                  className={`${
                    errors.tournamentDescription
                      ? "input-error"
                      : "input-bordered"
                  } input w-full placeholder:capitalize`}
                  {...register("tournamentDescription")}
                ></textarea>
                {errors.tournamentDescription ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.tournamentDescription.message}
                    </span>
                  </label>
                ) : null}
              </div>

              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-bold capitalize text-white">
                    Tournament end date
                  </span>
                </label>
                <input
                  type="date"
                  className={`${
                    errors.tournamentEndDate ? "input-error" : "input-bordered"
                  } input w-full placeholder:capitalize`}
                  {...register("tournamentEndDate")}
                />
                {errors.tournamentEndDate ? (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.tournamentEndDate.message}
                    </span>
                  </label>
                ) : null}
              </div>
            </div>
          </div>

          <button
            className="btn-primary btn mt-3 w-full disabled:bg-primary/30 disabled:text-white"
            type="submit"
            disabled={!isValid}
          >
            Next step (Application form)
          </button>
        </form>
      </div>
    </div>
  );
}

export default TournamentDetailsForm;
