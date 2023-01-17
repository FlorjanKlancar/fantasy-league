import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { tournaments, users_on_tournament, user_data } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../../../utils/trpc";
import UserAvatar from "../../user/UserAvatar";

type Props = {
  userId: string;
  tournamentId: string;
  user: users_on_tournament & {
    user_data: user_data;
    tournaments: tournaments;
  };
};

function InviteRecommendationsRow({ userId, tournamentId, user }: Props) {
  const inviteUserMutation = trpc.users.sendInviteToUsers.useMutation();

  const inviteUser = async (invitedUserId: string) => {
    if (!invitedUserId) return;

    const toastId = toast.loading("Sending...");

    await inviteUserMutation.mutate(
      {
        users: [invitedUserId],
        sentFromUser: userId,
        tournamentId,
      },
      {
        onSuccess() {
          toast.success("Invite sent successfully!", { id: toastId });
        },
        onError(e) {
          toast.error(e.message, { id: toastId });
        },
      }
    );
  };

  return (
    <li className="flex items-center justify-between space-x-3 py-4">
      <div className="flex min-w-0 flex-1 items-center space-x-3">
        <div className="relative h-10 w-10  flex-shrink-0">
          <UserAvatar
            imagePx={10}
            userProfileImg={user.user_data.avatar_url!}
            userFullName={user.user_data.full_name!}
            userId={user.user_data.id}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">
            {user.user_data.full_name ?? user.user_data.email}
          </p>
          <p className="flex truncate text-sm font-medium text-gray-500">
            You played together in{" "}
            <Link href={`/tournament/${user.tournamentId}`} target={"_blank"}>
              <span className="text_link ml-1">{user.tournaments.name}</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="flex-shrink-0">
        {inviteUserMutation.isSuccess ? (
          <button
            type="button"
            disabled={true}
            className="inline-flex items-center rounded-full  border-2 border-primary py-2 px-3"
          >
            <CheckIcon
              className="-ml-1 mr-0.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span className="text-sm font-medium ">Invited</span>
          </button>
        ) : (
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-transparent bg-secondary py-2 px-3 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => inviteUser(user.userId)}
          >
            <PlusIcon
              className="-ml-1 mr-0.5 h-5 w-5 text-white"
              aria-hidden="true"
            />
            <span className="text-sm font-medium">Invite</span>
          </button>
        )}
      </div>
    </li>
  );
}

export default InviteRecommendationsRow;
