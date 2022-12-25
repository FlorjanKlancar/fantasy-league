import Image from "next/image";
import React from "react";
import FantasyTable from "../components/table/FantasyTable";
import TournamentHeader from "../components/tournament/TournamentHeader";
import TournamentParticipants from "../components/tournament/TournamentParticipants";
import TournamentPrizes from "../components/tournament/TournamentPrizes";
import { TableLECData } from "../types/TableTypes";
import teams from "../utils/LEC.json";

function HomePage() {
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

  const prepareData = teams.teams.map((team: TableLECData, i: number) => {
    return {
      ...team,
      id: i + 1,
      team: (
        <div className="flex justify-end space-x-4 ">
          <div className="relative h-12 w-14">
            <Image
              src={team.logo}
              alt={team.team}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            />
          </div>

          <div className="flex w-36 items-center">
            <span>{team.team}</span>
          </div>
        </div>
      ),
    };
  });
  const [data, setData] = React.useState(prepareData);

  return (
    <>
      <TournamentHeader />
      <div className="grid grid-cols-2 gap-[100px]">
        <div className="flex flex-col  ">
          <TournamentParticipants />
          <TournamentPrizes />
        </div>

        <FantasyTable columns={columns} data={data} setData={setData} />
      </div>
    </>
  );
}

export default HomePage;
