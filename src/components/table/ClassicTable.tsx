import React from "react";
import type { TableOptions } from "react-table";
import { useTable } from "react-table";

function ClassicTable({ columns, data }: TableOptions<object>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <div className="overflow-x-auto">
      <table className="table h-full w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i: number) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={i}
              className="left-0 first:sticky"
            >
              {headerGroup.headers.map((column, i: number) => (
                <th
                  {...column.getHeaderProps()}
                  key={i}
                  className="!important sticky left-0 xl:static"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                className="!important sticky left-0 overflow-hidden xl:static"
                {...row.getRowProps()}
                key={i}
              >
                {row.cells.map((cell, i: number) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={i}
                      className="!important first:sticky first:left-0 first:z-50"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClassicTable;
