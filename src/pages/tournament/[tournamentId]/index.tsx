import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LECTable from "../../../components/table/LECTable";
import TournamentHeader from "../../../components/tournament/TournamentHeader";
import TournamentParticipants from "../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../components/tournament/TournamentPrizes";

function TournamentView() {
  const router = useRouter();
  const session = useSession();

  const [submitData, setSubmitData] = useState<unknown>();
  const { tournamentId } = router.query;

  if (!tournamentId || !session) return;

  return (
    <>
      <TournamentHeader
        tournamentId={tournamentId!.toString()}
        submitData={submitData}
      />

      <div className="grid auto-rows-fr grid-cols-1 px-4 md:grid-cols-2 md:gap-[100px] md:px-0">
        <div className="flex flex-col">
          <TournamentParticipants tournamentId={tournamentId!.toString()} />

          <TournamentPrizes />
        </div>

        <LECTable
          userId={session.user.id}
          setSubmitData={setSubmitData}
          tournamentId={tournamentId!.toString()}
        />
      </div>
    </>
  );
}

export default TournamentView;
/* 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tournamentId } = context.query;

  if (!tournamentId)
    return {
      notFound: true,
    };

  const { data } = trpc.tournament.getById.useQuery(tournamentId.toString());

  console.log({ data });

  return { props: {} };
};
 */
