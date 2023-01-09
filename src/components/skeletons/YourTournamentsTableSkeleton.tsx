import React from "react";
import PageMainHeader from "../layout/PageMainHeader";

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
      <PageMainHeader>Your tournaments</PageMainHeader>

      <div className="overflow-x-auto rounded-lg">
        <table className="table h-full w-full">
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
