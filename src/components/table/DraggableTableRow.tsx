import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";

export const DraggableTableRow = ({ row }: any) => {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({
    id: row.original.id,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
  };
  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <td colSpan={row.cells.length}>&nbsp;</td>
      ) : (
        row.cells.map((cell: any, i: any) =>
          i === 0 ? (
            <td {...cell.getCellProps()}>
              <DragHandle {...attributes} {...listeners} />
              <span>{cell.render("Cell")}</span>
            </td>
          ) : (
            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
          )
        )
      )}
    </tr>
  );
};
