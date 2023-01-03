import React, { useEffect, useState } from "react";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import UserDropdown from "./UserDropdown";
import { MultiValue } from "react-select/dist/declarations/src";
import { trpc } from "../../utils/trpc";
import { toast } from "react-hot-toast";

type Props = {
  copyToClipboardHandler: () => void;
  tournamentId: string;
  userId: string;
  setOpenModal: (open: boolean) => void;
};

function InviteUser({
  copyToClipboardHandler,
  tournamentId,
  userId,
  setOpenModal,
}: Props) {
  const [location, setLocation] = useState("");
  const [inviteSelections, setInviteSelections] =
    useState<MultiValue<{ label: string; value: string }>>();

  const sendInviteMutation = trpc.users.sendInviteToUsers.useMutation();

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inviteSelections) return;

    const toastId = toast.loading("Sending...");

    await sendInviteMutation.mutate(
      {
        users: inviteSelections.map((user) => user.value),
        tournamentId,
        sentFromUser: userId,
      },
      {
        onSuccess() {
          toast.success("Invites sent successfully!", { id: toastId });
          setOpenModal(false);
        },
        onError(e) {
          toast.error(e.message, { id: toastId });
        },
      }
    );
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
