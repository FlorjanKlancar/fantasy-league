import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  numberOfRows: number;
};

function TournamentParticipantsSkeleton({ numberOfRows }: Props) {
  return (
    <div className="overflow-hidden border-2 border-primary/50 bg-slate-800 sm:rounded-md">
      <div className="flex justify-between bg-slate-900 p-4 text-sm font-bold	uppercase leading-4">
        <h2>Participants</h2>
        <p className="flex cursor-pointer items-center hover:text-primary">
          Invite players <PlusIcon className="ml-1 h-4 w-4" />
        </p>
      </div>
      <ul role="list" className="divide-y divide-slate-600">
        {[...Array(numberOfRows)].map((_, i) => (
          <li key={i}>
            <div className="flex items-center px-4 py-4 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center">
                <div className="flex-shrink-0">
                  <div className="skeleton_default_style h-12 w-12 rounded-full" />
                </div>

                <div className="min-w-0 flex-1 items-center px-4 text-lg md:grid md:grid-cols-2 md:gap-4">
                  <p className="skeleton_default_style mb-1 h-6 w-32  rounded " />

                  <div>
                    <p className="skeleton_default_style mb-2 h-5 w-40 rounded "></p>

                    <div className="flex">
                      <div className="skeleton_default_style mr-1.5 h-5 w-5 flex-shrink-0 rounded-full" />
                      <p className="skeleton_default_style h-5 w-20 rounded" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <ChevronRightIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentParticipantsSkeleton;
