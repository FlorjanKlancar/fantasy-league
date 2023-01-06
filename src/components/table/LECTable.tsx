import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { TableLECData } from "../../types/TableTypes";
import { trpc } from "../../utils/trpc";
import LECTableSkeleton from "../skeletons/LECTableSkeleton";
import DragAndDropTable from "./DragAndDropTable";

type Props = {
  setSubmitData?: (data: unknown) => void;
  tournamentId: string;
  userId: string;
};

function LECTable({ setSubmitData, tournamentId, userId }: Props) {
  const router = useRouter();

  const { data: lecData, isLoading } = trpc.lec.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const { data: userLecPrediction, isLoading: isLoadingPredictions } =
    trpc.lec.getLECTournamentPredictionsForUser.useQuery(
      {
        userId,
        tournamentId,
      },
      {
        onError(err) {
          toast.error(err.message);
          router.push(`/tournament/${tournamentId}`);
        },
      }
    );

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
          <div className="flex justify-center space-x-4 lg:justify-end">
            <div className="relative h-8 w-10 md:h-12 md:w-14">
              <Image
                src={team.logo}
                alt={team.name}
                fill
                sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw,
                 33vw"
              />
            </div>

            <div className="flex w-12 items-center md:w-36 ">
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
  }, [lecData, userLecPrediction]);

  useEffect(() => {
    setSubmitData && setSubmitData(data);
  }, [data]);

  const { data: tournamentData, isLoading: loadingTournamentData } =
    trpc.tournament.getById.useQuery({
      tournamentId: tournamentId,
    });

  if (
    isLoading ||
    !lecData ||
    isLoadingPredictions ||
    loadingTournamentData ||
    !tournamentData
  )
    return <LECTableSkeleton numberOfRows={11} />;

  const isUserLockedIn = () => {
    const findUserOnTournament = tournamentData.users_on_tournament.find(
      (user) => user.userId === userId
    );

    if (
      findUserOnTournament?.userStatus === "Locked in" ||
      dayjs(tournamentData.lockInDate) < dayjs()
    ) {
      return true;
    }

    return false;
  };

  return (
    <div className="mt-12 md:mt-0">
      <DragAndDropTable
        columns={columns}
        data={data}
        setData={setData}
        tournamentId={tournamentId}
        isUserLockedIn={isUserLockedIn()}
      />
    </div>
  );
}

export default LECTable;
