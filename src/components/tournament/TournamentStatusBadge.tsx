import React from "react";

type Props = {
  tournamentStatus: string;
};

function TournamentStatusBadge({ tournamentStatus }: Props) {
  const checkBadgeStyling = (status: string) => {
    const badgeStatus = status.toLowerCase();
    let badgeStyle;

    switch (badgeStatus) {
      case "open":
        badgeStyle = "bg-emerald-700 text-white";
        break;
      case "closed":
        badgeStyle = "bg-red-500";
        break;
      case "in progress":
        badgeStyle = "bg-blue-500";
        break;
      default:
        badgeStyle = "bg-primary";
    }

    return badgeStyle;
  };

  return (
    <span
      className={`mt-1.5 inline-flex h-6 items-center rounded-full px-3 py-0.5 text-sm font-medium uppercase ${checkBadgeStyling(
        tournamentStatus
      )}`}
    >
      {tournamentStatus}
    </span>
  );
}

export default TournamentStatusBadge;
