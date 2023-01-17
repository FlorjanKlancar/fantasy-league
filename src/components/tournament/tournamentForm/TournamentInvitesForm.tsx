import Link from "next/link";
import React, { useState } from "react";
import { MultiValue } from "react-select";
import UserDropdown from "../../user/UserDropdown";
import InviteRecommendations from "./InviteRecommendations";

type Props = {
  userId: string;
  tournamentId: string;
};

function TournamentInvitesForm({ userId, tournamentId }: Props) {
  const [inviteSelections, setInviteSelections] =
    useState<MultiValue<{ label: string; value: string }>>();

  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-2">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium capitalize leading-6 text-white">
              Invite other players
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              You can invite other players with invitation or share them the
              link
            </p>
          </div>
        </div>
        <div className="mt-5 md:col-span-1 md:mt-0">
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-slate-800 px-4 py-5 sm:p-6">
              <div className="mx-auto max-w-lg">
                <div>
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h2 className="mt-2 text-lg font-medium capitalize text-white">
                      Invite other players
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                      You haven’t added any other players to this tournament
                      yet. As the owner of this tournament, you can invite
                      others players.
                    </p>
                  </div>
                  <form action="#" className="mt-6 flex">
                    <UserDropdown setInviteSelections={setInviteSelections} />

                    <button
                      type="submit"
                      className="ml-4 flex-shrink-0 rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Send invite
                    </button>
                  </form>
                </div>
                <div className="mt-10">
                  <h3 className="text-sm font-medium">
                    Players who participated in your tournaments
                  </h3>

                  <InviteRecommendations
                    userId={userId}
                    tournamentId={tournamentId}
                  />
                </div>
              </div>
            </div>
          </div>
          <Link href={`/tournament/${tournamentId}`}>
            <button className="btn-primary btn mt-3 w-full">
              Show Tournament
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TournamentInvitesForm;
