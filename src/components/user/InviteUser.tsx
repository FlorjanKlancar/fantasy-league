import React, { useEffect, useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UserDropdown from "./UserDropdown";
import { MultiValue } from "react-select/dist/declarations/src";

type Props = {
  copyToClipboardHandler: () => void;
  tournamentId: string;
};

function InviteUser({ copyToClipboardHandler, tournamentId }: Props) {
  const [location, setLocation] = useState("");
  const [inviteSelections, setInviteSelections] =
    useState<MultiValue<{ label: string; value: string }>>();

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ inviteSelections });
    //send invites
  };

  return (
    <form onSubmit={submitHandler}>
      <h2 className="my-3 text-sm	font-bold uppercase leading-4">
        Invite players to this tournament - Disabled for now
      </h2>

      <UserDropdown
        tournamentId={tournamentId}
        setInviteSelections={setInviteSelections}
      />

      <div className="py-8">
        <h2 className="my-3 text-sm	font-bold uppercase leading-4">
          Invite players using this link
        </h2>

        <div className="flex space-x-2">
          <input
            type="text"
            value={`${location}`}
            className="input-bordered input w-full "
            readOnly
          />
          <CopyToClipboard text={`${location}`} onCopy={copyToClipboardHandler}>
            <button className="btn-outline btn-square btn" type="button">
              <ClipboardIcon className="h-5 w-5" />
            </button>
          </CopyToClipboard>
        </div>
      </div>

      <div>
        <button className="btn-primary btn w-full" type="submit">
          Send invite
        </button>
      </div>
    </form>
  );
}

export default InviteUser;
