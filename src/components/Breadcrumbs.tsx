import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

export default function Breadcrumbs() {
  const router = useRouter();

  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: router.query.tournamentId
      ? router.query.tournamentId.toString()
      : "",
  });

  if (!tournamentData || isLoading) return <div>Load</div>;

  const pages = [
    {
      name: tournamentData.name,
      href: `/tournament/${tournamentData.id}`,
      current: false,
    },
    {
      name: "Edit",
      href: `/tournament/${tournamentData.id}/edit`,
      current: true,
    },
  ];

  return (
    <nav className="mb-8 mt-2 flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={page.href}
                className={`ml-4 text-sm font-medium  text-gray-500                 hover:text-gray-700`}
                aria-current={page.current ? "page" : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
