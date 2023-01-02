import { useSession } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import Link from "next/link";
import React, { useMemo } from "react";
import YourTournamentsTableSkeleton from "../components/skeletons/YourTournamentsTableSkeleton";
import ClassicTable from "../components/table/ClassicTable";
import NoDataTable from "../components/table/NoDataTable";
import TournamentStatusBadge from "../components/tournament/TournamentStatusBadge";
import UserLabels from "../components/user/UserLabels";
import UserPickStatus from "../components/user/UserPickStatus";

import { trpc } from "../utils/trpc";

function HomePage() {
  const session = useSession();
  const { data: userTournaments, isLoading } =
    trpc.users.getTournamentsByUser.useQuery({
      userId: session!.user.id,
    });

  const columns = useMemo(
    () => [
      {
        Header: "Tournament Name",
        accessor: "tournamentName", // accessor is the "key" in the data
      },
      {
        Header: "Created At",
        accessor: "createdAt",
      },
      {
        Header: "Participants",
        accessor: "tournamentParticipants",
      },
      {
        Header: "Tournament Type",
        accessor: "tournamentType",
      },
      {
        Header: "Your status",
        accessor: "yourStatus",
      },
      {
        Header: "Tournament status",
        accessor: "tournamentStatus",
      },
      {
        Header: "",
        accessor: "openButton",
      },
    ],
    []
  );

  if (isLoading)
    return (
      <YourTournamentsTableSkeleton numberOfHeaders={5} numberOfRows={5} />
    );

  const tableData = userTournaments!.map((tournament) => {
    return {
      tournamentName: (
        <div className="flex items-center space-x-3 lg:pl-2">
          <div
            className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${
              dayjs(tournament.tournaments.lockInDate) < dayjs()
                ? "bg-slate-600"
                : "bg-emerald-700"
            }`}
          />
          <div className="flex space-x-2 truncate">
            <Link href={`/tournament/${tournament.tournamentId}`}>
              <span className="text_link">{tournament.tournaments.name}</span>
            </Link>
          </div>
        </div>
      ),
      createdAt: dayjs(tournament.created_at).format("DD. MM. YYYY"),
      tournamentParticipants: (
        <UserLabels tournamentId={tournament.tournamentId} />
      ),
      tournamentType: (
        <div className="flex items-center text-base font-semibold">
          <img
            className="mr-2 h-10 w-10"
            src={tournament.tournaments.tournament_types.logoImage}
            alt={`${tournament.tournaments.tournament_types.type} Logo`}
          />
          <span>{tournament.tournaments.tournament_types.type}</span>
        </div>
      ),
      yourStatus: <UserPickStatus userStatus={tournament.userStatus} />,
      tournamentStatus: (
        <div className="flex items-center justify-center">
          <TournamentStatusBadge
            tournamentDate={tournament.tournaments.lockInDate}
          />
        </div>
      ),
      openButton: (
        <Link href={`/tournament/${tournament.tournamentId}`}>
          <button className="text_link">View</button>
        </Link>
      ),
    };
  });

  return (
    <>
      <div className="my-6 border-b border-secondary pb-5">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <div className="sm:w-0 sm:flex-1">
            <h1 className="text-4xl font-semibold">Your Tournaments</h1>
          </div>
        </div>
      </div>

      {userTournaments?.length ? (
        <ClassicTable columns={columns} data={tableData} />
      ) : (
        <NoDataTable />
      )}
    </>
  );
}

export default HomePage;
