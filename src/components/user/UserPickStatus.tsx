import {
  CheckCircleIcon,
  ClockIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import React from "react";

type Props = {
  userStatus: string;
};

function UserPickStatus({ userStatus }: Props) {
  return (
    <div>
      <p className="flex items-center text-sm text-slate-400">
        {userStatus.toLowerCase() === "picking" ? (
          <ClockIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-yellow-400"
            aria-hidden="true"
          />
        ) : userStatus.toLowerCase() === "invited" ? (
          <EnvelopeIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-secondary"
            aria-hidden="true"
          />
        ) : (
          <CheckCircleIcon
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400"
            aria-hidden="true"
          />
        )}
        {userStatus}
      </p>
    </div>
  );
}

export default UserPickStatus;
