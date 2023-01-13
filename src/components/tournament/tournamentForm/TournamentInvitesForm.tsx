import React from "react";
import InvitePlayersModule from "./InvitePlayersModule";

function TournamentInvitesForm() {
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
              <InvitePlayersModule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentInvitesForm;
