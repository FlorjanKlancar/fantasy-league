import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";
import TournamentStatusBadge from "./TournamentStatusBadge";
import TournamentHeaderSkeleton from "../skeletons/TournamentHeaderSkeleton";
import Modal from "../Modal";
import DeleteTournamentModal from "./DeleteTournamentModal";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  tournamentId: string;
  userId: string;
};

export default function TournamentHeader({ tournamentId, userId }: Props) {
  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: tournamentId,
  });

  const [openModal, setOpenModal] = useState(false);

  if (isLoading || !tournamentData) return <TournamentHeaderSkeleton />;

  return (
    <>
      <div className="my-6 border-b border-secondary px-4 pb-5 sm:px-0">
        <div className="sm:items-baseline sm:justify-between lg:flex">
          <div className="w-full">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold sm:text-4xl">
                Tournament - {tournamentData.name}
              </h1>
              <TournamentStatusBadge
                tournamentDate={tournamentData.lockInDate}
              />
            </div>

            <p className="mt-2 truncate text-sm">
              {tournamentData.description}
            </p>
          </div>

          {tournamentData.tournamentOwner === userId && (
            <div className="mt-4 hidden items-center justify-between sm:mt-0 sm:ml-6 sm:justify-start lg:flex lg:flex-shrink-0">
              <Menu as="div" className="relative ml-3 inline-block text-left">
                <div>
                  <Menu.Button className="-my-2 flex items-center rounded-full bg-slate-800 p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 w-40 origin-top-right rounded-md border border-primary/50 bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href={`/tournament/${tournamentId}/edit`}
                          className={classNames(
                            active ? "bg-slate-700" : "",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Edit Tournament
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? "bg-slate-700" : "",
                            "block px-4 py-2 text-sm"
                          )}
                          onClick={() => setOpenModal(true)}
                        >
                          Delete Tournament
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          )}
        </div>
      </div>
      <Modal open={openModal} setOpen={setOpenModal}>
        <DeleteTournamentModal
          setOpen={setOpenModal}
          tournamentId={tournamentId}
        />
      </Modal>
    </>
  );
}
