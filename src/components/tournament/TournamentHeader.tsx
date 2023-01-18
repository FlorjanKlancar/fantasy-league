import { Fragment, useEffect, useState } from "react";
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
import toast from "react-hot-toast";
import type { users_on_tournament, user_data } from "@prisma/client";
import Modal from "../Modal";
import DeleteTournamentModal from "./DeleteTournamentModal";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  tournamentId: string;
  submitData?: any;
};

export default function TournamentHeader({ tournamentId, submitData }: Props) {
  const utils = trpc.useContext();
  const session = useSession();
  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: tournamentId,
  });

  const { data: userLecPrediction, isLoading: isLoadingPredictions } =
    trpc.lec.getLECTournamentPredictionsForUser.useQuery({
      userId: session?.user.id ?? "",
      tournamentId: tournamentId.toString(),
    });

  const [userData, setUserPickStatus] = useState<
    | (users_on_tournament & {
        user_data: user_data;
      })
    | undefined
  >();
  const [openModal, setOpenModal] = useState(false);

  const submitPredictionMutation =
    trpc.lec.submitLECTournamentPrediction.useMutation();
  const toggleUserStatus = trpc.users.toggleUserPickStatus.useMutation();

  useEffect(() => {
    if (!tournamentData || !session) return;

    const findUser = tournamentData.users_on_tournament.find(
      (user) => user.userId === session.user.id
    );

    setUserPickStatus(findUser);
  }, [tournamentData, session]);

  if (isLoading || !tournamentData || !userData || isLoadingPredictions)
    return <TournamentHeaderSkeleton />;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session || !submitData || !userData) return;

    const toastId = toast.loading("Locking in...");

    await submitPredictionMutation.mutate(
      {
        userId: session.user.id!,
        tournamentId: tournamentData.id,
        predictions: submitData.map((team: TableLECData) => {
          return { id: team.id, teamId: team.teamId, teamName: team.teamName };
        }),
        userOnTournamentId: userData.id,
        predictionId: userLecPrediction?.id,
        tournamentLockInDate: tournamentData.lockInDate,
      },
      {
        onSuccess() {
          toast.success("Locked in successfully!", { id: toastId });

          utils.users.getUsersOnTournament.invalidate();
        },
        onError(e) {
          toast.error(e.message, { id: toastId });
        },
      }
    );
  };

  return (
    <div className="my-6 border-b border-secondary px-4 pb-5 sm:px-0">
      <div className="sm:items-baseline sm:justify-between lg:flex">
        <div className="w-full">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold sm:text-4xl">
              Tournament - {tournamentData.name}
            </h1>
            <TournamentStatusBadge tournamentDate={tournamentData.lockInDate} />
          </div>

          <p className="mt-2 truncate text-sm">{tournamentData.description}</p>
        </div>

        {submitData && (
          <div className="mt-5 flex w-full items-center justify-between space-x-5 sm:mt-0 sm:place-content-end xl:w-2/3">
            {dayjs(tournamentData.lockInDate) > dayjs() ? (
              <>
                <p className="text-base sm:text-xl">
                  Lock in closes on:{" "}
                  <span className="font-semibold underline decoration-secondary underline-offset-4">
                    {dayjs(tournamentData.lockInDate).format(dateFormat)}
                  </span>
                </p>
                <form onSubmit={(e) => submitHandler(e)}>
                  {userData?.userStatus === "Picking" ? (
                    <button
                      className="btn-sm btn flex w-28 items-center border-green-800 bg-green-600 text-white hover:bg-green-700 sm:btn-md lg:w-full"
                      onClick={async () => {
                        await toggleUserStatus.mutate(
                          {
                            userOnTournamentId: userData.id,
                            userStatus: "Locked in",
                          },
                          {
                            onSuccess() {
                              utils.users.getUsersOnTournament.invalidate();
                              utils.tournament.getById.invalidate();
                            },
                            onError(e) {
                              toast.error(e.message);
                            },
                          }
                        );
                      }}
                    >
                      Lock in{" "}
                      <CheckCircleIcon className="ml-1 h-4 w-4 lg:h-6 lg:w-6" />
                    </button>
                  ) : (
                    <button
                      className="btn-sm btn flex items-center border-orange-800 bg-orange-600 text-white hover:bg-orange-700 sm:btn-md"
                      type="button"
                      onClick={async () => {
                        const toastId = toast.loading("Unlocking...");
                        await toggleUserStatus.mutate(
                          {
                            userOnTournamentId: userData.id,
                            userStatus: "Picking",
                          },
                          {
                            onSuccess() {
                              toast.success("Teams unlocked!", {
                                id: toastId,
                              });

                              utils.users.getUsersOnTournament.invalidate();
                              utils.tournament.getById.invalidate();
                            },
                            onError(e) {
                              toast.error(e.message, { id: toastId });
                            },
                          }
                        );
                      }}
                    >
                      Unlock
                    </button>
                  )}
                </form>
              </>
            ) : (
              <p className="text-lg">
                Tournament is in progress since:{" "}
                <span className="font-semibold underline decoration-secondary underline-offset-4">
                  {dayjs(tournamentData.lockInDate).format(dateFormat)}
                </span>
              </p>
            )}
          </div>
        )}

        {tournamentData.tournamentOwner === session?.user.id && (
          <div className="mt-4 hidden items-center justify-between sm:mt-0 sm:ml-6 sm:justify-start lg:flex lg:flex-shrink-0">
            <Menu as="div" className="relative ml-3 inline-block text-left">
              <div>
                <Menu.Button className="-my-2 flex items-center rounded-full bg-slate-800 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <span className="sr-only">Open options</span>
                  <EllipsisVerticalIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
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
                <Menu.Items className="absolute right-0 z-10 w-40 origin-top-right rounded-md border border-primary/50 bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={`/tournament/${tournamentId}/edit`}
                        className={classNames(
                          active ? "bg-slate-700" : "",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit Tournament
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? "bg-slate-700" : "",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => setOpenModal(true)}
                      >
                        Delete Tournament
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        )}
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <DeleteTournamentModal
          setOpen={setOpenModal}
          tournamentId={tournamentId}
        />
      </Modal>
    </div>
  );
}
