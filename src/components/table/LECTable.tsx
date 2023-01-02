import type { users_LEC_predictions } from "@prisma/client";
import { useSession } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { TableLECData } from "../../types/TableTypes";
import { trpc } from "../../utils/trpc";
import LECTableSkeleton from "../skeletons/LECTableSkeleton";
import DragAndDropTable from "./DragAndDropTable";

type Props = {
  setSubmitData: (data: unknown) => void;
  tournamentId: string;
};

function LECTable({ setSubmitData, tournamentId }: Props) {
  const session = useSession();
  const { data: lecData, isLoading } = trpc.lec.getAll.useQuery();
  const { data: userLecPrediction, isLoading: isLoadingPredictions } =
    trpc.lec.getLECTournamentPredictionsForUser.useQuery({
      userId: session?.user.id ?? "",
      tournamentId: tournamentId?.toString() ?? "",
    });

  const [data, setData] = useState<unknown>([]);

  const columns = useMemo(
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

  useEffect(() => {
    if (!lecData) return;

    let parsePredictions: TableLECData[] = [];
    let findTeam: any;

    const tableData = lecData.map((team, i: number) => {
      if (userLecPrediction) {
        parsePredictions = JSON.parse(userLecPrediction.prediction as string);

        findTeam = parsePredictions.find(
          (prediction: TableLECData) =>
            Number(team.id) === Number(prediction.teamId)
        );
      }

      return {
        id: userLecPrediction ? findTeam.id : i + 1,

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
        teamName: team.name,
        teamId: team.id,
      };
    });

    setData(
      userLecPrediction ? tableData.sort((a, b) => a.id - b.id) : tableData
    );
  }, [lecData]);

  useEffect(() => {
    setSubmitData(data);
  }, [data]);

  if (isLoading || !lecData) return <LECTableSkeleton numberOfRows={11} />;

  return (
    <DragAndDropTable
      columns={columns}
      data={data}
      setData={setData}
      tournamentId={tournamentId}
    />
  );
}

export default LECTable;
