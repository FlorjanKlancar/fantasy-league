import React from "react";

type Props = {
  numberOfRows: number;
};

function LECTableSkeleton({ numberOfRows }: Props) {
  return (
    <div className="w-full rounded-md">
      <table className="table w-full">
        <thead>
          <tr className="text-center">
            <th></th>
            <th>Standings</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(numberOfRows)].map((_, i) => (
            <tr key={i}>
              <td>
                <div className="skeleton_default_style h-8 w-8 rounded-full" />
              </td>
              <td>
                <div className="skeleton_default_style h-8 w-8 rounded-full" />
              </td>
              <td className="">
                <div className="flex justify-end space-x-4 ">
                  <div className="skeleton_default_style relative h-12 w-14 rounded"></div>

                  <div className="skeleton_default_style w-36 rounded"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LECTableSkeleton;
