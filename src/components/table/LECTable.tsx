import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { trpc } from "../../utils/trpc";
import LECTableSkeleton from "../skeletons/LECTableSkeleton";
import DragAndDropTable from "./DragAndDropTable";

type Props = {
  setSubmitData: (data: unknown) => void;
};

function LECTable({ setSubmitData }: Props) {
  const { data: lecData, isLoading } = trpc.lec.getAll.useQuery();

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
        teamName: team.name,
        teamId: team.id,
      };
    });

    setData(tableData);
  }, []);

  useEffect(() => {
    setSubmitData(data);
  }, [data]);

  if (isLoading || !lecData) return <LECTableSkeleton numberOfRows={11} />;

  return <DragAndDropTable columns={columns} data={data} setData={setData} />;
}

export default LECTable;
