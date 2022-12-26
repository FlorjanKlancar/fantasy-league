import { useSession } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { trpc } from "../utils/trpc";

function HomePage() {
  const session = useSession();
  const { data: userTournaments, isLoading } =
    trpc.users.getTournamentsByUser.useQuery({
      userId: session!.user.id,
    });

  if (isLoading) return <div>loading</div>;
  return (
    <>
      <div className="my-6 border-b border-secondary pb-5">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <div className="sm:w-0 sm:flex-1">
            <h1 className="text-4xl font-semibold">Your Tournaments</h1>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Tournament Name</th>
              <th>Created At</th>
              <th>Tournament Status</th>
              <th>Tournament Type</th>
              <th>Your status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userTournaments?.map((tournament, i: number) => (
              <tr>
                <td>{i + 1}</td>
                <td>{tournament.tournaments?.name}</td>
                <td>{dayjs(tournament.created_at).format("DD. MM. YYYY")}</td>
                <td>{tournament.tournaments?.status}</td>
                <td>{tournament.tournaments?.type}</td>
                <td>{tournament.userStatus}</td>
                <td>
                  <Link href={`/tournament/${tournament.tournamentId}`}>
                    <button className="btn-outline btn-secondary btn">
                      Open
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomePage;
