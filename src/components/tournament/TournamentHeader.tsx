import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";
import TournamentStatusBadge from "./TournamentStatusBadge";
import TournamentHeaderSkeleton from "../skeletons/TournamentHeaderSkeleton";
import dayjs from "dayjs";
import { dateFormat } from "../../utils/variables";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "@supabase/auth-helpers-react";
import { TableLECData } from "../../types/TableTypes";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  tournamentId: string;
  submitData: any;
};

export default function TournamentHeader({ tournamentId, submitData }: Props) {
  const session = useSession();
  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: tournamentId,
  });

  const mutation = trpc.lec.submitLECTournamentPrediction.useMutation();

  if (isLoading || !tournamentData) return <TournamentHeaderSkeleton />;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || !submitData) return;
    console.log({ submitData });
    mutation.mutate({
      userId: session.user.id!,
      tournamentId: tournamentData.id,
      predictions: submitData.map((team: TableLECData) => {
        return { id: team.id, teamId: team.teamId, teamName: team.teamName };
      }),
    });
  };

  return (
    <div className="my-6 border-b border-secondary pb-5">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-semibold">
              Tournament - {tournamentData.name}
            </h1>
            <TournamentStatusBadge tournamentStatus={tournamentData.status!} />
          </div>

          <p className="mt-2 truncate text-sm">{tournamentData.description}</p>
        </div>

        <div>
          <div className="flex flex-col ">
            <form
              className="flex items-center justify-end space-x-5 pt-3 pb-8"
              onSubmit={(e) => submitHandler(e)}
            >
              <p className="text-xl">
                Lock in closes on:{" "}
                <span className="font-semibold underline decoration-secondary underline-offset-4">
                  {dayjs(tournamentData.lockInDate).format(dateFormat)}
                </span>
              </p>
              <button className="btn flex items-center bg-green-600 text-white hover:bg-green-700">
                Lock in <CheckCircleIcon className="ml-1 h-6 w-6" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          <Menu as="div" className="relative ml-3 inline-block text-left">
            <div>
              <Menu.Button className="-my-2 flex items-center rounded-full bg-slate-800 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-slate-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "" : "text-gray-700",
                          "flex justify-between px-4 py-2 text-sm"
                        )}
                      >
                        <span>Edit</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex justify-between px-4 py-2 text-sm"
                        )}
                      >
                        <span>Duplicate</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex w-full justify-between px-4 py-2 text-sm"
                        )}
                      >
                        <span>Archive</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}
