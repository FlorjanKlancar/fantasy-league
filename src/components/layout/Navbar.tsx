import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import UserAvatar from "../user/UserAvatar";

function Navbar() {
  const session = useSession();
  const supabase = useSupabaseClient();

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure
      as="nav"
      className="supports-backdrop-blur:bg-white/95 sticky top-0 z-50 w-full flex-none border-slate-50/[0.06] bg-slate-900/75 backdrop-blur transition-colors duration-500 lg:border-b lg:border-slate-900/10"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  <Link href="/" className="navbar_link_active">
                    Dashboard
                  </Link>
                  <a href="#" className="navbar_link">
                    Team
                  </a>
                  <a href="#" className="navbar_link">
                    Projects
                  </a>
                  <a href="#" className="navbar_link">
                    Calendar
                  </a>
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-slate-800 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                {session && (
                  <>
                    <div className="mr-5">
                      <button className="btn-sm btn bg-secondary text-white hover:bg-secondary/60">
                        New tournament
                      </button>
                    </div>
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full bg-primary/80 p-1 text-white hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-4 flex-shrink-0">
                      <div>
                        <Menu.Button className="flex rounded-full bg-primary/80 text-sm hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <UserAvatar
                            imagePx={8}
                            hasRingStyle={true}
                            userProfileImg={
                              session.user.user_metadata.avatar_url
                            }
                            userFullName={session.user.user_metadata.full_name}
                            userId={session.user.id}
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
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-primary/50 bg-slate-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-slate-700" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Your Profile
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-slate-700" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                Settings
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-slate-700" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                                onClick={() => supabase.auth.signOut()}
                              >
                                Sign out
                              </a>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
              <Disclosure.Button
                as="a"
                href="#"
                className="navbar_mobile_link_active"
              >
                Dashboard
              </Disclosure.Button>
              <Disclosure.Button as="a" href="#" className="navbar_mobile_link">
                Team
              </Disclosure.Button>
              <Disclosure.Button as="a" href="#" className="navbar_mobile_link">
                Projects
              </Disclosure.Button>
              <Disclosure.Button as="a" href="#" className="navbar_mobile_link">
                Calendar
              </Disclosure.Button>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {session && (
                <>
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          session.user.user_metadata.avatar_url ??
                          `https://avatars.dicebear.com/api/pixel-art/${session.user.email}.svg?background=%234f46e5`
                        }
                        alt={
                          session.user.user_metadata.full_name ??
                          session.user.email
                        }
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {session.user.user_metadata.full_name ??
                          session.user.email}
                      </div>
                      <div className="text-sm font-medium text-slate-400">
                        {session.user.user_metadata.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto flex-shrink-0 rounded-full bg-primary/80 p-1 text-white hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="navbar_mobile_link"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="navbar_mobile_link"
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="#"
                      className="navbar_mobile_link"
                      onClick={() => supabase.auth.signOut()}
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
