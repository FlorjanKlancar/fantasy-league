import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function PageMainHeader({ children }: Props) {
  return (
    <div className="my-6 border-b border-secondary pb-5">
      <div className="sm:flex sm:items-baseline sm:justify-between">
        <div className="sm:w-0 sm:flex-1">
          <h1 className="text-4xl font-semibold capitalize">{children}</h1>
        </div>
      </div>
    </div>
  );
}

export default PageMainHeader;
