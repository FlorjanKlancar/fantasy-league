import React from "react";
import styled from "styled-components";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

const HandleWrapper = styled.div`
  height: 2rem;
  vertical-align: bottom;
  display: inline-block;
  margin-right: 2px;
  float: left;
  cursor: ${({ isdragging }: any) => (isdragging ? "grabbing" : "grab")};
`;

export const DragHandle = (props: any) => {
  return (
    <HandleWrapper {...props}>
      <ChevronUpDownIcon className="h-8 w-8" {...props} />
    </HandleWrapper>
  );
};
