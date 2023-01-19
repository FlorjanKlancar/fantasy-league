import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import LECTable from "../../../components/table/LECTable";
import TournamentHeader from "../../../components/tournament/TournamentHeader";
import TournamentParticipants from "../../../components/tournament/TournamentParticipants";
import TournamentPrizes from "../../../components/tournament/TournamentPrizes";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { tournaments, users_on_tournament, user_data } from "@prisma/client";
import { supabaseService } from "../../../utils/supabaseService";
import TournamentBadgesInfo from "../../../components/tournament/TournamentBadgesInfo";

type Props = {
  session: Session;
  tournamentData: tournaments & {
    users_on_tournament: (users_on_tournament & {
      user_data: user_data;
    })[];
  };
};

function TournamentView({ session, tournamentData }: Props) {
  const [submitData, setSubmitData] = useState<any>();

  return (
    <>
      <TournamentHeader
        tournamentId={tournamentData.id}
        userId={session.user.id}
      />

      <TournamentBadgesInfo
        tournamentId={tournamentData.id}
        submitData={submitData}
        userId={session.user.id}
      />

      <div className="grid grid-cols-1 gap-14 px-4 pt-5 lg:grid-cols-2 lg:gap-[100px] lg:px-0">
        <div className="flex flex-col space-y-5">
          <div className="h-1/3">
            <h2 className="text my-2 uppercase text-white">HOW DOES IT WORK</h2>
            <p className="text-sm text-slate-400">
              you have the power to easily move teams and players around,
              creating your own predictions for how the tournament will play
              out. Our intuitive interface makes it simple for you to visualize
              your predictions and make adjustments as needed. You can play
              around with different scenarios, placing teams and players in
              different positions to see how it affects the final standings. The
              ability to drag and drop teams and players is a fast and easy way
              to make predictions and have fun while doing it.
            </p>
            <h2 className="text my-2 uppercase text-white">About app</h2>
            <p className="text-sm text-slate-400">
              Our app also allows you to compare your predictions with other
              players and see how your predictions stack up against the
              competition. With the ability to share your predictions with
              friends and other players, you can also challenge them to beat
              your predictions. The winner takes it all.
            </p>
          </div>
          <TournamentParticipants tournamentId={tournamentData.id} />
        </div>

        <LECTable
          userId={session.user.id}
          setSubmitData={setSubmitData}
          tournamentId={tournamentData.id}
        />
      </div>
    </>
  );
}

export default TournamentView;

export async function getServerSideProps(
  context: GetServerSidePropsContext<{ tournamentId: string }>
) {
  const supabase = createServerSupabaseClient(context);
  // Check if we have a session
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

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer: superjson,
  });
  const tournamentId = context.params!.tournamentId as string;

  try {
    const tournamentData = await ssg.tournament.getById.fetch({ tournamentId });

    if (!tournamentData) {
      return {
        notFound: true,
      };
    }

    const serializeUserData = tournamentData?.users_on_tournament.map(
      (user) => {
        return { ...user, id: Number(user.id) };
      }
    );

    const findUserOnTournament = serializeUserData.find(
      (user) => user.userId === session.user.id
    );

    if (!findUserOnTournament && tournamentData.lockInDate > new Date()) {
      await supabaseService.from("users_on_tournament").insert({
        userId: session.user.id,
        tournamentId: tournamentData?.id,
        userStatus: "Picking",
      });
    } else if (!findUserOnTournament) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        tournamentData: JSON.parse(
          JSON.stringify({
            ...tournamentData,
            id: tournamentData?.id,
            typeId: Number(tournamentData?.typeId),
            users_on_tournament: serializeUserData,
            tournament_types: {
              ...tournamentData.tournament_types,
              id: Number(tournamentData.tournament_types.id),
            },
          })
        ),
        session: session,
      },
    };
  } catch (e: unknown) {
    return {
      notFound: true,
    };
  }
}
