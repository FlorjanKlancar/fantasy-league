import {
  CheckCircleIcon,
  ClockIcon,
  LockClosedIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { TrophyIcon } from "@heroicons/react/24/solid";
import type { users_on_tournament, user_data } from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { TableLECData } from "../../types/TableTypes";
import { trpc } from "../../utils/trpc";
import { dateFormat } from "../../utils/variables";
import TournamentBadgesInfoSkeleton from "../skeletons/TournamentBadgesInfoSkeleton";
import TournamentHeaderSkeleton from "../skeletons/TournamentHeaderSkeleton";

type Props = {
  tournamentId: string;
  userId: string;
  submitData?: TableLECData[];
};

function TournamentBadgesInfo({ tournamentId, userId, submitData }: Props) {
  const utils = trpc.useContext();

  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: tournamentId,
  });

  const { data: userLecPrediction, isLoading: isLoadingPredictions } =
    trpc.lec.getLECTournamentPredictionsForUser.useQuery({
      userId,
      tournamentId,
    });

  const [userData, setUserPickStatus] = useState<
    | (users_on_tournament & {
        user_data: user_data;
      })
    | undefined
  >();

  const submitPredictionMutation =
    trpc.lec.submitLECTournamentPrediction.useMutation();
  const toggleUserStatus = trpc.users.toggleUserPickStatus.useMutation();

  useEffect(() => {
    if (!tournamentData) return;

    const findUser = tournamentData.users_on_tournament.find(
      (user) => user.userId === userId
    );

    setUserPickStatus(findUser);
  }, [tournamentData]);

  if (isLoading || !tournamentData || !userData || isLoadingPredictions)
    return <TournamentBadgesInfoSkeleton />;

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!submitData || !userData) return;

    const toastId = toast.loading("Locking in...");

    await submitPredictionMutation.mutate(
      {
        userId,
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

  const badges = [
    {
      badgeIcon: <TrophyIcon className="h-6 w-6 text-amber-600" />,
      badgeValue: `${
        tournamentData.ticketPrice
          ? tournamentData.users_on_tournament.length *
            tournamentData.ticketPrice
          : 0
      } €`,
      badgeText: "Total prize pool",
    },
    {
      badgeIcon: <ClockIcon className="h-6 w-6 text-secondary" />,
      badgeValue: dayjs(tournamentData.lockInDate).format(dateFormat),
      badgeText: "Lock in date",
    },
    {
      badgeIcon: (
        <Image
          src={tournamentData.tournament_types.logoImage}
          width={30}
          height={30}
          alt={tournamentData.tournament_types.type}
        />
      ),
      badgeValue: tournamentData.tournament_types.type,
      badgeText: "Tournament Type",
    },
  ];

  return (
    <div className="my-5 flex w-full flex-col items-center justify-between px-4 lg:my-8 lg:flex-row lg:px-0">
      <div className="flex w-full flex-col space-y-5 sm:mb-8 sm:flex-row sm:space-y-0 sm:space-x-2 lg:mb-0">
        {badges.map((badge) => (
          <div
            key={badge.badgeValue}
            className="flex h-14 w-56 items-center rounded-full border border-primary bg-slate-900/80 sm:w-48 md:w-48 lg:border-none"
          >
            <div className="flex w-1/3 justify-center">{badge.badgeIcon}</div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-white">{badge.badgeValue}</p>
              <p className="text-sm capitalize text-slate-500">
                {badge.badgeText}
              </p>
            </div>
          </div>
        ))}
      </div>

      {submitData && (
        <div className="mt-5 flex w-full sm:mt-0 lg:w-52">
          <form onSubmit={(e) => submitHandler(e)} className="w-full">
            {dayjs(tournamentData.lockInDate) > dayjs() ? (
              <>
                {userData?.userStatus === "Picking" ? (
                  <button
                    className="btn flex w-full items-center gap-2 border-green-800 bg-green-600 text-white hover:bg-green-700 "
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
                    <CheckCircleIcon className="h-4 w-4 lg:h-6 lg:w-6" />
                    Lock in
                  </button>
                ) : (
                  <button
                    className="btn flex w-full items-center gap-2 border-amber-800 bg-amber-600 text-white hover:bg-amber-700 "
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
                    <LockOpenIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                    Unlock
                  </button>
                )}
              </>
            ) : (
              <button
                className="btn flex items-center gap-2 border-none bg-green-600 text-white hover:bg-green-700 disabled:bg-green-900/50"
                type="button"
                disabled={true}
              >
                <LockClosedIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                Lock in closed
              </button>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

export default TournamentBadgesInfo;
