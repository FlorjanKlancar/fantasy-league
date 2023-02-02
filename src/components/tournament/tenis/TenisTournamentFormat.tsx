import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { tenis_players } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import DragAndDropTable from "../../table/DragAndDropTable";
import Brackets from "./Brackets";
import SelectPlayers from "./SelectPlayers";
import TenisHowToPlay from "./TenisHowToPlay";

type Props = {
  setSubmitData?: (data: unknown) => void;
  tournamentId: string;
  userId: string;
};

type DropdownPlayersType = {
  id: number;
  country: string;
  name: string;
};

function TenisTournamentFormat({ setSubmitData, tournamentId, userId }: Props) {
  const [selectedList, setSelectedList] = useState<DropdownPlayersType[]>([]);
  const [tableData, setTableData] = useState<any>([]);

  const selectPlayersHandler = (
    e: React.FormEvent,
    selected: DropdownPlayersType
  ) => {
    e.preventDefault();
    if (!selected) return;

    if (selectedList.length >= 10) {
      toast.error("You already have 10 players!");
      return;
    }

    setSelectedList([...selectedList, selected]);
  };

  const removePlayerFromSelected = (playerRank: number) => {
    setSelectedList(selectedList.filter((player) => player.id !== playerRank));
  };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "emptyColumn",
      },
      {
        Header: "Standings",
        accessor: "id",
      },

      {
        Header: "Player",
        accessor: "player",
      },
      {
        Header: "",
        accessor: "removeColumn",
      },
    ],
    []
  );

  useEffect(() => {
    const tableData = selectedList.map((player, i: number) => {
      return {
        id: i + 1,
        player: (
          <div className="ml-8 flex items-center space-x-3">
            <Image
              src={player.country!}
              alt="Country Img"
              width={40}
              height={35}
            />
            <span className="text-base">{player.name}</span>
          </div>
        ),
        removeColumn: (
          <div
            className="tooltip tooltip-left cursor-pointer"
            data-tip="Remove player"
            onClick={() => removePlayerFromSelected(player.id)}
          >
            <XMarkIcon className="h-5 w-5 text-red-500" />
          </div>
        ),
      };
    });

    setTableData(tableData);
  }, [selectedList]);

  return (
    <div>
      {/*  <Brackets /> */}
      <div className="grid grid-cols-1 gap-14 px-4 pt-5 lg:grid-cols-2 lg:gap-[100px] lg:px-0">
        <div className="flex flex-col space-y-5">
          <h1 className="text-xl font-semibold">Player selector</h1>
          <SelectPlayers
            selectPlayersHandler={selectPlayersHandler}
            selectedList={selectedList}
          />
          <TenisHowToPlay />
        </div>

        <div className="h-full">
          {selectedList.length ? (
            <div>
              <h1 className="text-xl font-semibold">Selected list</h1>

              <progress
                className="progress progress-primary my-2 w-full border border-slate-700"
                value={selectedList.length}
                max="10"
              ></progress>
              <div className="mt-12 md:mt-0">
                <DragAndDropTable
                  columns={columns}
                  data={tableData}
                  setData={setTableData}
                  tournamentId={tournamentId}
                  isUserLockedIn={false}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-500 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <FaceSmileIcon className="h-10 w-10" />
              <span className="mt-2 block text-sm font-medium">
                Select 10 players to continue
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TenisTournamentFormat;
