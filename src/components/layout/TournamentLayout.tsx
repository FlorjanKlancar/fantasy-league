import type { ReactNode } from "react";
import TournamentHeader from "../tournament/TournamentHeader";
import TournamentBadgesInfo from "../tournament/TournamentBadgesInfo";
import Breadcrumbs from "../Breadcrumbs";

type DefaultLayoutProps = {
  children: ReactNode;
  tournamentId: string;
  userId: string;
  submitData?: any;
};

export const TournamentLayout = ({
  children,
  tournamentId,
  userId,
  submitData,
}: DefaultLayoutProps) => {
  return (
    <>
      <Breadcrumbs />

      <TournamentHeader tournamentId={tournamentId} userId={userId} />

      <TournamentBadgesInfo
        tournamentId={tournamentId}
        submitData={submitData}
        userId={userId}
      />

      {children}
    </>
  );
};
