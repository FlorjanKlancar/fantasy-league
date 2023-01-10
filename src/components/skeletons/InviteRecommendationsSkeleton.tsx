import React from "react";

type Props = {
  numberOfRows: number;
};

function InviteRecommendationsSkeleton({ numberOfRows }: Props) {
  return (
    <ul
      role="list"
      className="mt-4 divide-y divide-primary border-t border-b border-primary"
    >
      {[...Array(numberOfRows)].map((_, i) => (
        <li
          key={i}
          className="flex items-center justify-between space-x-3 py-4"
        >
          <div className="flex min-w-0 flex-1 items-center space-x-3">
            <div className="skeleton_default_style relative h-10 w-10 flex-shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <p className="skeleton_default_style h-8 rounded" />
              <p className="skeleton_default_style mt-1 flex h-6 rounded" />
            </div>
          </div>
          <div className="skeleton_default_style h-10 w-16 flex-shrink-0 rounded-full" />
        </li>
      ))}
    </ul>
  );
}

export default InviteRecommendationsSkeleton;
