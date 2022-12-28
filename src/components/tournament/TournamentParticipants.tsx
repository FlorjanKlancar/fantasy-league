import { ChevronRightIcon, EnvelopeIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";
import dayjs from "dayjs";
import UserAvatar from "../user/UserAvatar";
import UserPickStatus from "../user/UserPickStatus";
import TournamentParticipantsSkeleton from "../skeletons/TournamentParticipantsSkeleton";

type Props = {
  tournamentId: string;
};

export default function TournamentParticipants({ tournamentId }: Props) {
  const { data: participantsData, isLoading } =
    trpc.users.getUsersOnTournament.useQuery({
      tournamentId: tournamentId,
    });

  if (isLoading || !participantsData)
    return <TournamentParticipantsSkeleton numberOfRows={3} />;

  return (
    <div className="overflow-hidden border-2 border-primary/50 bg-slate-800 sm:rounded-md">
      <div className="bg-slate-900 p-4 text-sm font-bold	uppercase leading-4">
        <h2>Participants</h2>
      </div>
      <ul role="list" className="divide-y divide-slate-600">
        {participantsData.map((participant, i: number) => (
          <li key={i}>
            <a className="block hover:bg-slate-900/50">
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
                    <div>
                      {participant.user_data && (
                        <p className="truncate font-medium text-primary">
                          {participant.user_data.full_name ??
                            participant.user_data.email}
                        </p>
                      )}
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="mb-2 text-sm">
                          Joined on{" "}
                          {participant.created_at && (
                            <time>
                              {dayjs(participant.created_at).format(
                                "DD. MM. YYYY"
                              )}
                            </time>
                          )}
                        </p>
                        <UserPickStatus userStatus={participant.userStatus} />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
