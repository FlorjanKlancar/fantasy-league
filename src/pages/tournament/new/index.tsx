import { useSession } from "@supabase/auth-helpers-react";
import Head from "next/head";
import React from "react";
import PageMainHeader from "../../../components/layout/PageMainHeader";
import NewTournamentForm from "../../../components/tournament/tournamentForm/NewTournamentForm";

function NewTournamentPage() {
  const session = useSession();

  if (!session) return;

  return (
    <>
      <Head>
        <title>New Tournament</title>
      </Head>

      <PageMainHeader>Create new tournament</PageMainHeader>
      <NewTournamentForm userId={session.user.id} />
    </>
  );
}

export default NewTournamentPage;
