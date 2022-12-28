import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  numberOfRows: number;
};

function TournamentParticipantsSkeleton({ numberOfRows }: Props) {
  return (
    <div className="overflow-hidden border-2 border-primary/50 bg-slate-800 sm:rounded-md">
      <div className="bg-slate-900 p-4 text-sm font-bold	uppercase leading-4">
        <h2>Participants</h2>
      </div>
      <ul role="list" className="divide-y divide-slate-600">
        {[...Array(numberOfRows)].map((_, i) => (
          <li key={i}>
            <a className="block hover:bg-slate-900/50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="flex-shrink-0">
                    <div className="skeleton_default_style h-12 w-12 rounded-full" />
                  </div>
                  <div className="min-w-0 flex-1 items-center px-4 text-lg md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="skeleton_default_style h-5 w-28 truncate rounded font-medium text-primary" />
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="skeleton_default_style w-42 mb-2 h-5 rounded text-sm"></p>
                        <p className="skeleton_default_style h-5 w-32 rounded" />
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
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TournamentParticipantsSkeleton;
