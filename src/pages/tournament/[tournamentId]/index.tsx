import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession } from "@supabase/auth-helpers-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import LECTable from "../../../components/table/LECTable";
import TournamentHeader from "../../../components/tournament/TournamentHeader";
import TournamentParticipants from "../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../components/tournament/TournamentPrizes";
import { supabase } from "../../../utils/supabase";
import { trpc } from "../../../utils/trpc";

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

      <div className="grid auto-rows-fr grid-cols-1 px-4 lg:grid-cols-2 lg:gap-[100px] lg:px-0">
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  //CHECK IF TOURNAMENT EXISTS
  //CHECK IF USER IS ON THE TOURNAMENT OTHERWISE JOIN HIM IF TOURNAMENT IS NOT EXPIRED

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};
