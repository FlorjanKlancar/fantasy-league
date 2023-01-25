import { GetServerSidePropsContext } from "next";
import React, { useState } from "react";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";
import { appRouter } from "../../../server/trpc/router/_app";
import { createContext } from "../../../server/trpc/context";
import type { Session } from "@supabase/auth-helpers-nextjs";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type {
  tournaments,
  users_on_tournament,
  user_data,
} from "@prisma/client";
import { supabaseService } from "../../../utils/supabaseService";
import { TournamentLayout } from "../../../components/layout/TournamentLayout";
import LECTournamentFormat from "../../../components/tournament/LEC/LECTournamentFormat";
import TenisTournamentFormat from "../../../components/tournament/tenis/TenisTournamentFormat";

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

  const renderTournamentType = (data: typeof tournamentData) => {
    let renderComponent;
    switch (Number(data.typeId)) {
      case 1:
        renderComponent = (
          <LECTournamentFormat
            tournamentId={data.id}
            userId={session.user.id}
            setSubmitData={setSubmitData}
          />
        );
        break;
      case 2:
        renderComponent = (
          <TenisTournamentFormat
            tournamentId={data.id}
            userId={session.user.id}
            setSubmitData={setSubmitData}
          />
        );
        break;
      default:
        renderComponent = <div>Tournament not supported yet</div>;
        break;
    }

    return renderComponent;
  };

  return (
    <TournamentLayout
      submitData={submitData}
      userId={session.user.id}
      tournamentId={tournamentData.id}
    >
      {renderTournamentType(tournamentData)}
    </TournamentLayout>
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
