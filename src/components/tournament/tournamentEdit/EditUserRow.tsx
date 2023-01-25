import { TrashIcon } from "@heroicons/react/24/outline";
import type {
  tournaments,
  users_on_tournament,
  user_data,
} from "@prisma/client";
import dayjs from "dayjs";
import React from "react";
import UserAvatar from "../../user/UserAvatar";

type Props = {
  participant: users_on_tournament & {
    user_data: user_data;
    tournaments: tournaments;
  };
  userId: string;
  setOpen: (open: boolean) => void;
  setRemoveUser: (p: any) => void;
};

function EditUserRow({ participant, userId, setOpen, setRemoveUser }: Props) {
  const removeUserHandler = async (participantData: typeof participant) => {
    setOpen(true);
    setRemoveUser(participantData);
  };

  return (
    <li>
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center">
          <div className="flex-shrink-0">
            {participant.user_data && (
              <UserAvatar
                imagePx={12}
                userProfileImg={participant.user_data.avatar_url!}
                userFullName={participant.user_data.full_name!}
                userId={participant.user_data.id}
              />
            )}
          </div>
          <div className="min-w-0 flex-1 items-center px-4 text-lg md:grid md:grid-cols-2 md:gap-4">
            {participant.user_data && (
              <p className="truncate font-medium text-primary">
                {participant.user_data.full_name ?? participant.user_data.email}
              </p>
            )}

            <div>
              <p className="text-sm">
                Joined on{" "}
                {participant.created_at && (
                  <time>
                    {dayjs(participant.created_at).format("DD. MM. YYYY")}
                  </time>
                )}
              </p>
            </div>
          </div>
        </div>

        {participant.userId !== userId && (
          <button onClick={() => removeUserHandler(participant)}>
            <TrashIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </button>
        )}
      </div>
    </li>
  );
}

export default EditUserRow;
