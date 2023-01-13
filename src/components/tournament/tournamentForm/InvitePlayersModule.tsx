import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { MultiValue } from "react-select";
import UserDropdown from "../../user/UserDropdown";
import InviteRecommendations from "./InviteRecommendations";

export default function InvitePlayersModule() {
  const [inviteSelections, setInviteSelections] =
    useState<MultiValue<{ label: string; value: string }>>();
  const session = useSession();

  if (!session) return <div>Loading</div>;

  return (
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
            You haven’t added any other players to this tournament yet. As the
            owner of this tournament, you can invite others players.
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
          Team members previously added to projects
        </h3>

        <InviteRecommendations userId={session.user.id} />
      </div>
    </div>
  );
}
