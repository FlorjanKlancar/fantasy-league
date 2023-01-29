import autoAnimate from "@formkit/auto-animate";
import React, { useEffect, useRef, useState } from "react";
import Brackets from "./Brackets";
import SelectPlayers from "./SelectPlayers";

type Props = {
  setSubmitData?: (data: unknown) => void;
  tournamentId: string;
  userId: string;
};

function TenisTournamentFormat({ setSubmitData, tournamentId, userId }: Props) {
  const [selectedList, setSelectedList] = useState<any>([]);
  const parent = useRef(null);

  const submitHandler = (e: any, selected: any) => {
    e.preventDefault();

    setSelectedList([...selectedList, selected]);
    console.log("submit", selected);
  };

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  console.log({ selectedList });

  return (
    <div>
      Tenis
      {/*  <Brackets /> */}
      <div className="grid grid-cols-2 gap-5">
        <SelectPlayers submitHandler={submitHandler} />
        <div>
          Selected list
          <div ref={parent}>
            {selectedList &&
              selectedList.map((player: any) => (
                <div className="flex items-center">
                  <img
                    src={player.avatar}
                    alt=""
                    className="h-6 w-6 flex-shrink-0 rounded-full"
                  />
                  <span className={"ml-3 block truncate font-semibold"}>
                    {player.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TenisTournamentFormat;
