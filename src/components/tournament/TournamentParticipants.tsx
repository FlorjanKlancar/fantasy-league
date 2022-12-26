import {
  CheckCircleIcon,
  ChevronRightIcon,
  EnvelopeIcon,
  ClockIcon,
} from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";
import dayjs from "dayjs";

type Props = {
  tournamentId: string;
};

export default function TournamentParticipants({ tournamentId }: Props) {
  const { data: participantsData, isLoading } =
    trpc.users.getUsersOnTournament.useQuery({
      tournamentId: tournamentId,
    });

  if (isLoading || !participantsData) return <div>Loading</div>;

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
                    <img
                      className="h-12 w-12 rounded-full"
                      src={
                        participant.user_data?.avatar_url ??
                        `https://avatars.dicebear.com/api/pixel-art/${participant.userId}.svg?background=%234f46e5`
                      }
                      alt={
                        participant.user_data?.full_name ??
                        "User profile picture"
                      }
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="truncate text-sm font-medium text-primary">
                        {participant.user_data?.full_name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <EnvelopeIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">
                          {participant.user_data?.full_name}
                        </span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm ">
                          Joined on{" "}
                          {participant.created_at && (
                            <time>
                              {dayjs(participant.created_at).format(
                                "DD. MM. YYYY"
                              )}
                            </time>
                          )}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          {participant.userStatus === "Picking" ? (
                            <ClockIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
                              aria-hidden="true"
                            />
                          ) : participant.userStatus === "Invited" ? (
                            <EnvelopeIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-secondary"
                              aria-hidden="true"
                            />
                          ) : (
                            <CheckCircleIcon
                              className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
                              aria-hidden="true"
                            />
                          )}
                          {participant.userStatus}
                        </p>
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
