import React from "react";

function TournamentHeaderSkeleton() {
  return (
    <div className="my-6 border-b border-secondary px-4 pb-5 sm:px-0">
      <div className="sm:items-baseline sm:justify-between lg:flex">
        <div className="w-full  sm:flex sm:items-baseline sm:justify-between">
          <div className="w-full">
            <div className="flex items-center space-x-4">
              <h1 className="skeleton_default_style h-12 w-72  rounded text-2xl font-semibold sm:w-1/2 lg:w-2/3" />
              <span
                className={`skeleton_default_style mt-1.5 inline-flex h-6 w-14  items-center rounded-full px-3 py-0.5 text-sm font-medium uppercase`}
              />
            </div>

            <p className="skeleton_default_style mt-2 h-5 w-40 truncate rounded text-sm" />
          </div>

          <div className="mt-4 hidden items-center justify-between sm:mt-0 sm:ml-6 sm:justify-start lg:flex lg:flex-shrink-0">
            <div className="relative ml-3 inline-block text-left">
              <div className="skeleton_default_style h-9 w-9 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TournamentHeaderSkeleton;
