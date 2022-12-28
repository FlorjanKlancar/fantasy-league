import React from "react";

type Props = {
  numberOfHeaders: number;
  numberOfRows: number;
};

function YourTournamentsTableSkeleton({
  numberOfHeaders,
  numberOfRows,
}: Props) {
  return (
    <>
      <div className="my-6 border-b border-secondary pb-5">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <div className="sm:w-0 sm:flex-1">
            <h1 className="text-4xl font-semibold">Your Tournaments</h1>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              {[...Array(numberOfHeaders)].map((_, i) => (
                <th key={i}>
                  <div className="skeleton_default_style h-8 w-36 rounded-lg"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(numberOfRows)].map((_, i) => (
              <tr key={i}>
                {[...Array(numberOfHeaders)].map((_, i) => (
                  <td key={i}>
                    <div className="skeleton_default_style h-8 w-36 rounded-lg"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default YourTournamentsTableSkeleton;
