import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import FantasyTable from "../../../components/table/FantasyTable";
import TournamentHeader from "../../../components/tournament/TournamentHeader";
import TournamentParticipants from "../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../components/tournament/TournamentPrizes";
import { trpc } from "../../../utils/trpc";

function TournamentView() {
  const router = useRouter();
  const { tournamentId } = router.query;

  const { data: lecData, isLoading } = trpc.lec.getAll.useQuery();

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "emptyColumn",
      },
      {
        Header: "Standing",
        accessor: "id",
      },

      {
        Header: "Team",
        accessor: "team",
      },
    ],
    []
  );

  if (isLoading || !lecData) return <div>Loading</div>;

  const tableData = lecData.map((team, i: number) => {
    return {
      id: i + 1,
      team: (
        <div className="flex justify-end space-x-4 ">
          <div className="relative h-12 w-14">
            <Image
              src={team.logo}
              alt={team.name}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>

          <div className="flex w-36 items-center">
            <span>{team.name}</span>
          </div>
        </div>
      ),
    };
  });

  return (
    <>
      <TournamentHeader tournamentId={tournamentId!.toString()} />
      <div className="grid grid-cols-2 gap-[100px]">
        <div className="flex flex-col  ">
          <TournamentParticipants tournamentId={tournamentId!.toString()} />
          <TournamentPrizes />
        </div>

        <FantasyTable columns={columns} tableData={tableData} />
      </div>
    </>
  );
}

export default TournamentView;
/* 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tournamentId } = context.query;

  if (!tournamentId)
    return {
      notFound: true,
    };

  const { data } = trpc.tournament.getById.useQuery(tournamentId.toString());

  console.log({ data });

  return { props: {} };
};
 */
