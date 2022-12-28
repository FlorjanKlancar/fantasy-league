import { useRouter } from "next/router";
import React, { useState } from "react";
import LECTable from "../../../components/table/LECTable";
import TournamentHeader from "../../../components/tournament/TournamentHeader";
import TournamentParticipants from "../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../components/tournament/TournamentPrizes";

function TournamentView() {
  const router = useRouter();
  const [submitData, setSubmitData] = useState<unknown>();
  const { tournamentId } = router.query;

  if (!tournamentId) return;

  return (
    <>
      <TournamentHeader
        tournamentId={tournamentId!.toString()}
        submitData={submitData}
      />

      <div className="grid grid-cols-2 gap-[100px]">
        <div className="flex flex-col">
          <TournamentParticipants tournamentId={tournamentId!.toString()} />

          <TournamentPrizes />
        </div>

        <LECTable setSubmitData={setSubmitData} />
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
