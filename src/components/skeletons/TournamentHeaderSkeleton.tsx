import React from "react";

function TournamentHeaderSkeleton() {
  return (
    <div className="my-6 border-b border-secondary pb-5">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1 className="skeleton_default_style h-12 w-96 rounded "></h1>
          <p className="skeleton_default_style mt-2 h-5 w-48"></p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          <div className="skeleton_default_style h-6 w-16 rounded-full" />
          <div className="skeleton_default_style relative ml-3 inline-block h-8 w-8 rounded-full text-left" />
        </div>
      </div>
    </div>
  );
}

export default TournamentHeaderSkeleton;
