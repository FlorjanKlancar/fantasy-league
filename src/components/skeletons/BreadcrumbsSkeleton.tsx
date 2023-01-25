import { ChevronRightIcon } from "@heroicons/react/20/solid";
import React from "react";

function BreadcrumbsSkeleton() {
  return (
    <nav className="mb-8 mt-2 flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div className="skeleton_default_style h-5 w-5 rounded-full" />
        </li>

        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span
              className={`skeleton_default_style ml-3 h-5 w-36 rounded`}
            ></span>
          </div>
        </li>
      </ol>
    </nav>
  );
}

export default BreadcrumbsSkeleton;
