import React, { useMemo, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTable } from "react-table";
import { DraggableTableRow } from "./DraggableTableRow";
import { StaticTableRow } from "./StaticTableRow";
import { TableColumns, TableLECData } from "../../types/TableTypes";

type Props = {
  columns: TableColumns[];
  setData: (data: any) => void;
  data: any;
};

export default function DragAndDropTable({ columns, data, setData }: Props) {
  const [activeId, setActiveId] = useState<number | null>();
  const items = useMemo(() => data?.map(({ id }: any) => id), [data]);
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (active.id !== over.id) {
      setData((data: TableLECData[]) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const returnArray = arrayMove(data, oldIndex, newIndex);

        return returnArray.map((item: any, i: number) => {
          return { ...item, id: i + 1 };
        });
      });

      /*  setSubmitData((data: TableLECData[]) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        const returnArray = arrayMove(data, oldIndex, newIndex);

        return returnArray.map((item: any, i: number) => {
          return { ...item, id: i + 1 };
        });
      }); */
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const selectedRow = useMemo(() => {
    if (!activeId) {
      return null;
    }
    const row: any = rows.find(({ original }: any) => original.id === activeId);
    prepareRow(row);
    return row;
  }, [activeId, rows, prepareRow]);

  // Render the UI for your table
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
    >
      <div className="h-full w-full overflow-x-auto rounded-md border-2 border-primary/50">
        <table {...getTableProps()} className="table w-full">
          <thead>
            {headerGroups.map((headerGroup, i: number) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="text-center"
                key={i}
              >
                {headerGroup.headers.map((column, i: number) => (
                  <th {...column.getHeaderProps()} key={i}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="text-center text-xl">
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {rows.map((row: any) => {
                prepareRow(row);
                return <DraggableTableRow key={row.original.id} row={row} />;
              })}
            </SortableContext>
          </tbody>
        </table>
      </div>
      <DragOverlay>
        {activeId && (
          <table style={{ width: "100%" }}>
            <tbody>
              <StaticTableRow row={selectedRow} />
            </tbody>
          </table>
        )}
      </DragOverlay>
    </DndContext>
  );
}
