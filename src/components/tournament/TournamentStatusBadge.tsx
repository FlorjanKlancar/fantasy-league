import dayjs from "dayjs";
import React from "react";

type Props = {
  tournamentDate: Date;
};

function TournamentStatusBadge({ tournamentDate }: Props) {
  const badgeStyling =
    dayjs(tournamentDate) < dayjs()
      ? "bg-slate-600 text-slate-200"
      : "bg-emerald-700 text-white";

  return (
    <span
      className={`mt-1.5 inline-flex h-6  items-center rounded-full px-3 py-0.5 text-sm font-medium uppercase
        ${badgeStyling}
      `}
    >
      {dayjs(tournamentDate) < dayjs() ? "Closed" : "Open"}
    </span>
  );
}

export default TournamentStatusBadge;
