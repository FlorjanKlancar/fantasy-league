import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import { trpc } from "../../../utils/trpc";
import InviteRecommendationsSkeleton from "../../skeletons/InviteRecommendationsSkeleton";
import UserAvatar from "../../user/UserAvatar";

type Props = {
  userId: string;
};

export default function InviteRecommendations({ userId }: Props) {
  const { data: recommendedUsers, isLoading } =
    trpc.users.getRecommendedUsersForInvite.useQuery({
      userId,
    });

  if (isLoading || !recommendedUsers)
    return <InviteRecommendationsSkeleton numberOfRows={4} />;

  return (
    <ul
      role="list"
      className="mt-4 divide-y divide-primary border-t border-b border-primary"
    >
      {recommendedUsers.map((user, i) => (
        <li
          key={i}
          className="flex items-center justify-between space-x-3 py-4"
        >
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            <div className="relative h-10 w-10  flex-shrink-0">
              <UserAvatar
                imagePx={10}
                userProfileImg={user.tournaments.user_data.avatar_url!}
                userFullName={user.tournaments.user_data.full_name!}
                userId={user.tournaments.user_data.id}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user.tournaments.user_data.full_name ??
                  user.tournaments.user_data.email}
              </p>
              <p className="flex truncate text-sm font-medium text-gray-500">
                You played together in{" "}
                <Link
                  href={`/tournament/${user.tournaments.id}`}
                  target={"_blank"}
                >
                  <span className="text_link ml-1">
                    {user.tournaments.name}
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-secondary py-2 px-3 hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PlusIcon
                className="-ml-1 mr-0.5 h-5 w-5 text-white"
                aria-hidden="true"
              />
              <span className="text-sm font-medium">Invite</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
