import React from "react";
import Brackets from "./Brackets";
import Example from "./PlayersMultiselect";

type Props = {
  setSubmitData?: (data: unknown) => void;
  tournamentId: string;
  userId: string;
};

function TenisTournamentFormat({ setSubmitData, tournamentId, userId }: Props) {
  return (
    <div>
      Tenis
      <Brackets />
    </div>
  );
}

export default TenisTournamentFormat;
