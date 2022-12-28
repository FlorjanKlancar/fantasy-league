import React from "react";
import { trpc } from "../../utils/trpc";
import UserAvatar from "./UserAvatar";
import UserAvatarSkeleton from "../skeletons/UserAvatarSkeleton";

type Props = {
  tournamentId: string;
};

const MAX_LABELS_PRESENTED = 3;

function UserLabels({ tournamentId }: Props) {
  const { data: userData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId,
  });

  return (
    <div className="flex items-center space-x-2">
      {isLoading || !userData ? (
        <div className="flex flex-shrink-0 -space-x-1">
          {[...Array(MAX_LABELS_PRESENTED)].map((_, i) => (
            <UserAvatarSkeleton key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex flex-shrink-0 -space-x-1">
            {userData.users_on_tournament
              .map((user, i: number) => (
                <div
                  data-tip={user.user_data.full_name ?? user.user_data.email}
                  className="tooltip"
                  key={i}
                >
                  <UserAvatar
                    userId={user.user_data.id}
                    imagePx={8}
                    userFullName={user.user_data.full_name!}
                    userProfileImg={user.user_data.avatar_url!}
                  />
                </div>
              ))
              .slice(0, MAX_LABELS_PRESENTED)}
          </div>
          {userData.users_on_tournament.length > MAX_LABELS_PRESENTED ? (
            <span className="flex-shrink-0 text-xs font-medium leading-5">
              +{userData.users_on_tournament.length - MAX_LABELS_PRESENTED}
            </span>
          ) : null}
        </>
      )}
    </div>
  );
}

export default UserLabels;
