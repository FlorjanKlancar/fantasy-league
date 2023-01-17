import React from "react";
import { trpc } from "../../../utils/trpc";
import InviteRecommendationsSkeleton from "../../skeletons/InviteRecommendationsSkeleton";
import InviteRecommendationsRow from "./InviteRecommendationsRow";

type Props = {
  userId: string;
  tournamentId: string;
};

export default function InviteRecommendations({ userId, tournamentId }: Props) {
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
      {recommendedUsers.length ? (
        recommendedUsers.map((user, i) => (
          <InviteRecommendationsRow
            key={i}
            user={user}
            userId={userId}
            tournamentId={tournamentId}
          />
        ))
      ) : (
        <li className="flex items-center justify-between space-x-3 py-4">
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            <p className="flex text-sm font-medium text-gray-500">
              You need to play some tournaments first!
            </p>
          </div>
        </li>
      )}
    </ul>
  );
}
