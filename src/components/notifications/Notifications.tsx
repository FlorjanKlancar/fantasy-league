import {
  Cog8ToothIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  tournaments,
  tournament_types,
  users_on_tournament,
  user_data,
  user_notifications,
} from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Dayjs } from "dayjs";
import { trpc } from "../../utils/trpc";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
type DateType = string | number | Date | Dayjs;

declare module "dayjs" {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string;
    from(compared: DateType, withoutSuffix?: boolean): string;
    toNow(withoutSuffix?: boolean): string;
    to(compared: DateType, withoutSuffix?: boolean): string;
  }
}

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

type Props = {
  notifications: (user_notifications & {
    user_data_user_notifications_sentFromUserTouser_data: user_data;
    tournaments: tournaments | null;
  })[];
  userTournaments: (users_on_tournament & {
    tournaments: tournaments & {
      tournament_types: tournament_types;
    };
  })[];
  userId: string;
};

function Notifications({ notifications, userTournaments, userId }: Props) {
  const utils = trpc.useContext();
  const router = useRouter();

  const joinUserMutation = trpc.users.userJoinsTournament.useMutation();

  const checkIfUserParticipatesInTournament = (tournamentId: string) => {
    const findTournament = userTournaments.find(
      (tournament) => tournament.tournamentId === tournamentId
    );

    if (!findTournament) return false;

    return true;
  };

  const acceptInvitation = async (
    tournamentId: string,
    notificationId: string
  ) => {
    if (!tournamentId || !notificationId) return;

    const toastId = toast.loading("Accepting...");
    await joinUserMutation.mutate(
      {
        userId,
        tournamentId,
        notificationId,
      },
      {
        onSuccess() {
          toast.success("Accepted invitation successfully!", { id: toastId });

          utils.users.getTournamentsByUser.invalidate();
          utils.notifications.getAllNotificationsForUser.invalidate();
        },
        onError(e) {
          toast.error(e.message, { id: toastId });
        },
      }
    );

    router.push(`/tournament/${tournamentId}`);
  };

  return (
    <div className="py-2 px-3">
      <div className="flex items-center justify-between">
        <h1 className="table_header_text ">Notifications</h1>

        <Cog8ToothIcon className="h-5 w-5" />
      </div>

      <ul className="-my-4 mt-5 divide-y divide-slate-600">
        {notifications.map((notification) => (
          <li key={notification.id} className="flex space-x-3 py-4">
            <div className="flex-shrink-0">
              <div className="relative h-8 w-8">
                <Image
                  src={
                    notification
                      .user_data_user_notifications_sentFromUserTouser_data
                      .avatar_url!
                  }
                  fill
                  className="rounded-full"
                  alt={"Profile img"}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-slate-400">
                <span className="font-semibold capitalize text-secondary">
                  {notification
                    .user_data_user_notifications_sentFromUserTouser_data
                    .full_name ??
                    notification
                      .user_data_user_notifications_sentFromUserTouser_data
                      .email}
                </span>{" "}
                is inviting you to tournament{" "}
                <span className="font-semibold text-slate-200">
                  {notification.tournaments?.name}
                </span>
              </p>

              <p className="my-0.5 text-xs text-slate-400">
                {dayjs(notification.created_at).fromNow()}
              </p>

              <div className="mt-2 flex">
                <span className="inline-flex items-center text-sm">
                  {checkIfUserParticipatesInTournament(
                    notification.tournamentId!
                  ) ? (
                    <div className="flex space-x-2">
                      <Link href={`/tournament/${notification.tournamentId}`}>
                        <p className="text_link">You already joined</p>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        className="btn-xs btn inline-flex space-x-2 bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-800"
                        onClick={() =>
                          acceptInvitation(
                            notification.tournamentId!,
                            notification.id
                          )
                        }
                      >
                        <CheckCircleIcon
                          className="h-5 w-5 text-slate-200"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-slate-200">
                          Accept
                        </span>
                      </button>
                      <button
                        type="button"
                        className="btn-outline btn-xs btn inline-flex space-x-2 border-slate-700 hover:bg-slate-800"
                      >
                        <XCircleIcon
                          className="h-5 w-5 text-slate-200"
                          aria-hidden="true"
                        />
                        <span className="font-medium text-slate-200">
                          Decline
                        </span>
                      </button>
                    </div>
                  )}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Link href="/notifications">
          <button type="button" className="btn-primary btn-sm btn w-full">
            View all
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Notifications;
