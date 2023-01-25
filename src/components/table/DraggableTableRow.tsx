import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { trpc } from "../../utils/trpc";

export const DraggableTableRow = ({
  row,
  tournamentId,
  isUserLockedIn,
}: any) => {
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

  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: tournamentId,
  });

  if (isLoading || !tournamentData) return <div>Loading</div>;

  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <td colSpan={row.cells.length} className="rounded-none">
          &nbsp;
        </td>
      ) : (
        row.cells.map((cell: any, i: number) =>
          i === 0 ? (
            <td
              key={i}
              className={`w-7 rounded-none ${
                isUserLockedIn ? "bg-slate-900" : ""
              }`}
              {...cell.getCellProps()}
            >
              {isUserLockedIn ? (
                <LockClosedIcon className="ml-1 mt-1 h-5 w-5 md:h-6 md:w-6" />
              ) : (
                <DragHandle {...attributes} {...listeners} />
              )}
              <span>{cell.render("Cell")}</span>
            </td>
          ) : (
            <td
              className={`rounded-none ${isUserLockedIn ? "bg-slate-900" : ""}`}
              key={i}
              {...cell.getCellProps()}
              {...(!isUserLockedIn ? { ...attributes } : null)}
              {...(!isUserLockedIn ? { ...listeners } : null)}
            >
              {cell.render("Cell")}
            </td>
          )
        )
      )}
    </tr>
  );
};
