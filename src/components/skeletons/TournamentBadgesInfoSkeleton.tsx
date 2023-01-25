import React from "react";

function TournamentBadgesInfoSkeleton() {
  return (
    <div className="my-5 flex w-full flex-col items-center justify-between px-4 lg:my-8 lg:flex-row lg:px-0">
      <div className="flex w-full flex-col items-center space-y-5 sm:mb-8 sm:flex-row sm:space-y-0 sm:space-x-2 lg:mb-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="skeleton_default_style flex h-14 w-56 rounded-full  sm:w-48 md:w-48 "
          />
        ))}
      </div>

      <div className="mt-5 w-full sm:mt-0 lg:w-52">
        <div className="skeleton_default_style h-12 w-full rounded-lg"></div>
      </div>
    </div>
  );
}

export default TournamentBadgesInfoSkeleton;
