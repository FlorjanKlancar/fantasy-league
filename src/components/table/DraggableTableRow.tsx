import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DragHandle } from "./DragHandle";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { trpc } from "../../utils/trpc";
import { useSession } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";

export const DraggableTableRow = ({ row, tournamentId }: any) => {
  const session = useSession();

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

  const isUserLockedIn = () => {
    const findUserOnTournament = tournamentData.users_on_tournament.find(
      (user) => user.userId === session?.user.id
    );

    console.log(findUserOnTournament?.userStatus);

    if (
      findUserOnTournament?.userStatus === "Locked in" ||
      dayjs(tournamentData.lockInDate) < dayjs()
    ) {
      return true;
    }

    return false;
  };

  return (
    <tr ref={setNodeRef} style={style} {...row.getRowProps()}>
      {isDragging ? (
        <td colSpan={row.cells.length}>&nbsp;</td>
      ) : (
        row.cells.map((cell: any, i: number) =>
          i === 0 ? (
            <td
              key={i}
              className={`${isUserLockedIn() ? "bg-slate-900" : ""}`}
              {...cell.getCellProps()}
            >
              {isUserLockedIn() ? (
                <LockClosedIcon className="ml-1 mt-1 h-6 w-6" />
              ) : (
                <DragHandle {...attributes} {...listeners} />
              )}
              <span>{cell.render("Cell")}</span>
            </td>
          ) : (
            <td
              className={`${isUserLockedIn() ? "bg-slate-900" : ""}`}
              key={i}
              {...cell.getCellProps()}
            >
              {cell.render("Cell")}
            </td>
          )
        )
      )}
    </tr>
  );
};
