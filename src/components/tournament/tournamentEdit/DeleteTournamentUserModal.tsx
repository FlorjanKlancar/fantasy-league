import { Dialog } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type {
  tournaments,
  users_on_tournament,
  user_data,
} from "@prisma/client";
import React from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../../../utils/trpc";

type Props = {
  removeUser: users_on_tournament & {
    user_data: user_data;
    tournaments: tournaments;
  };
  setOpen: (open: boolean) => void;
};

function RemoveTournamentUserModal({ removeUser, setOpen }: Props) {
  const utils = trpc.useContext();

  const deleteTournamentMutation =
    trpc.users.removeUserFromTournament.useMutation();

  const onRemoveHandler = async () => {
    const toastId = toast.loading("Removing user...");

    await deleteTournamentMutation.mutate(
      {
        userOnTournamentId: removeUser.id,
      },
      {
        onSuccess() {
          toast.success("Removed user successfully!", { id: toastId });
          setOpen(false);
          utils.users.getUsersOnTournament.invalidate();
        },
        onError(e) {
          toast.error(e.message);
        },
      }
    );
  };

  return (
    <div className="p-5">
      <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
        <button
          type="button"
          className="rounded-md hover:text-slate-500"
          onClick={() => setOpen(false)}
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationTriangleIcon
            className="h-6 w-6 text-red-900"
            aria-hidden="true"
          />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-white"
          >
            Delete User From Tournament
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm">
              Are you sure you want to delete{" "}
              <span className="font-bold underline decoration-secondary underline-offset-4">
                {removeUser.user_data.full_name ?? removeUser.user_data.email}
              </span>
              . This action cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={onRemoveHandler}
        >
          Delete
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md border border-slate-200 px-4 py-2 text-base font-medium shadow-sm hover:text-slate-300 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RemoveTournamentUserModal;
