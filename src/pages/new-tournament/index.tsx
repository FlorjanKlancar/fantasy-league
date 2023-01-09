import Head from "next/head";
import React from "react";
import PageMainHeader from "../../components/layout/PageMainHeader";
import NewTournamentForm from "../../components/tournament/tournamentForm/NewTournamentForm";

function NewTournamentPage() {
  return (
    <>
      <Head>
        <title>New Tournament</title>
      </Head>

      <PageMainHeader>Create new tournament</PageMainHeader>
      <NewTournamentForm />
    </>
  );
}

export default NewTournamentPage;
