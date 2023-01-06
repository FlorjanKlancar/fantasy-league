import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Notifications from "../notifications/Notifications";
import { trpc } from "../../utils/trpc";
import CircleSkeleton from "../skeletons/CircleSkeleton";

function NotificationsBell() {
  const session = useSession();

  const { data: userNotifications, isLoading } =
    trpc.notifications.getAllNotificationsForUser.useQuery({
      userId: session?.user.id ?? "",
    });

  const { data: userTournaments, isLoading: isLoad } =
    trpc.users.getTournamentsByUser.useQuery({
      userId: session?.user.id ?? "",
    });

  if (isLoading || isLoad || !userNotifications || !session || !userTournaments)
    return <CircleSkeleton />;

  const countNewNotifications = userNotifications.filter(
    (notification) => notification.isNew
  );
  return (
    <Menu as="div" className="relative ml-4 flex-shrink-0">
      <div>
        <Menu.Button className="flex-shrink-0 rounded-full bg-primary/80 p-1 text-white hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          {countNewNotifications.length ? (
            <div className="indicator flex items-center">
              <span className="badge-accent badge indicator-item h-5 w-5 ">
                {countNewNotifications.length}
              </span>

              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </div>
          ) : (
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          )}
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-96 origin-top-right rounded-md border border-primary/50 bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Notifications
            userId={session.user.id}
            notifications={userNotifications}
            userTournaments={userTournaments}
          />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default NotificationsBell;
