import { Fragment, MutableRefObject, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../../utils/trpc";
import Image from "next/image";
import { tenis_players } from "@prisma/client";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DropdownPlayersType } from "../../../types/DropdownPlayersType";

type Props = {
  selectPlayersHandler: (
    e: React.FormEvent,
    player: DropdownPlayersType
  ) => void;
  selectedList: DropdownPlayersType[];
};

const dropdownPlayerTransformer = (playersData: tenis_players[]) => {
  return playersData.map((player: tenis_players) => {
    return {
      id: player.rank,
      country: `https://countryflagsapi.com/png/${player.country?.toLocaleLowerCase()}`,
      name: player.name,
    };
  });
};

export default function SelectPlayers({
  selectPlayersHandler,
  selectedList,
}: Props) {
  const supabase = useSupabaseClient();

  const { data: tenisPlayersData, isLoading } =
    trpc.tenis.getAllTenisPlayers.useQuery({
      maxPlayers: 10,
    });

  const [selected, setSelected] = useState<DropdownPlayersType | object>({});
  const [query, setQuery] = useState("");
  const [dropdownPlayers, setDropdownPlayers] = useState<DropdownPlayersType[]>(
    []
  );
  const [isLoadingDropdown, setIsLoadingDropdown] = useState(false);

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const resetDropdownValues = () => {
    setQuery("");
    setSelected({});
    setDropdownPlayers(
      tenisPlayersData ? dropdownPlayerTransformer(tenisPlayersData) : []
    );
  };

  useEffect(() => {
    resetDropdownValues();
  }, [selectPlayersHandler]);

  useEffect(() => {
    if (!tenisPlayersData) return;

    setDropdownPlayers(dropdownPlayerTransformer(tenisPlayersData));
  }, [tenisPlayersData]);

  const checkIfPlayerIsSelected = (playerName: string) => {
    if (!playerName) return;

    return selectedList.find(
      (selectedPlayer) =>
        selectedPlayer.name.toLowerCase() === playerName.toLowerCase()
    );
  };

  const onChangeDebounceHandler = async (searchString: string) => {
    if (!searchString) return;

    const { data } = await supabase
      .from("tenis_players")
      .select("*")
      .ilike("name", `%${searchString}%`)
      .limit(20);

    if (data)
      setDropdownPlayers(
        data.map((player: tenis_players) => {
          return {
            id: player.rank,
            country: `https://countryflagsapi.com/png/${player.country?.toLocaleLowerCase()}`,
            name: player.name,
          };
        })
      );
    else setDropdownPlayers([]);

    setIsLoadingDropdown(false);
  };

  useEffect(() => {
    if (query.length > 1) setIsLoadingDropdown(true);

    const timeout = setTimeout(() => onChangeDebounceHandler(query), 1000);

    return () => {
      clearTimeout(timeout);
      setIsLoadingDropdown(false);
    };
  }, [query]);

  if (isLoading || !tenisPlayersData) return <div>Loading</div>;

  return (
    <form
      className="flex items-center space-x-3"
      onSubmit={(e) => selectPlayersHandler(e, selected as DropdownPlayersType)}
    >
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 w-64">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left">
            <Combobox.Input
              className="input-bordered input w-full placeholder:capitalize"
              onChange={(e) => setQuery(e.target.value)}
              displayValue={(player: tenis_players) => player.name}
              autoComplete="off"
            />

            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => resetDropdownValues}
          >
            {isLoadingDropdown ? (
              <Combobox.Options className="absolute mt-1 max-h-60  w-full divide-y divide-slate-700 overflow-auto rounded-md bg-slate-800 py-1 text-base text-slate-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <div className="relative animate-pulse cursor-default select-none py-2 px-4">
                  Loading...
                </div>
              </Combobox.Options>
            ) : (
              <Combobox.Options className="absolute mt-1 max-h-60  w-full divide-y divide-slate-700 overflow-auto rounded-md bg-slate-800 py-1 text-base text-slate-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {dropdownPlayers.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4">
                    Nothing found.
                  </div>
                ) : (
                  dropdownPlayers.map((player) => (
                    <Combobox.Option
                      key={player.id}
                      className={({ active, disabled }) =>
                        `relative select-none py-2 pl-10 pr-4 ${
                          active ? "cursor-pointer bg-primary text-white" : ""
                        }
                      ${disabled ? "cursor-disabled bg-slate-900" : ""}`
                      }
                      value={player}
                      disabled={
                        checkIfPlayerIsSelected(player.name) ? true : false
                      }
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <div className="relative h-4 w-7">
                              <Image
                                src={player.country}
                                fill
                                alt="Flag"
                                sizes="(max-width: 28px) 100vw"
                              />
                            </div>

                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "ml-3 block truncate"
                              )}
                            >
                              {player.name}
                            </span>
                          </div>
                          {selected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                active ? "text-white" : "text-secondary"
                              }`}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            )}
          </Transition>
        </div>
      </Combobox>

      <button
        className="btn-primary btn disabled:bg-primary/30 disabled:text-white"
        type="submit"
        disabled={!Object.keys(selected).length ? true : false}
      >
        Select this player
      </button>
    </form>
  );
}
