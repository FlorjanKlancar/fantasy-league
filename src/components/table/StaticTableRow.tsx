import React from "react";
import { DragHandle } from "./DragHandle";

export const StaticTableRow = ({ row }: any) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell: any, i: any) => {
        if (i === 0) {
          return (
            <td key={i} className="bg-base-100 ">
              <div className="flex space-x-8">
                <DragHandle isDragging />

                <span>{cell.render("Cell")}</span>
              </div>
            </td>
          );
        }
        return (
          <td className="bg-base-100" key={i}>
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
};
