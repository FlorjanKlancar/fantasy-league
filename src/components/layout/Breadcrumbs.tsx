import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import BreadcrumbsSkeleton from "../skeletons/BreadcrumbsSkeleton";

export default function Breadcrumbs() {
  const router = useRouter();

  const { data: tournamentData, isLoading } = trpc.tournament.getById.useQuery({
    tournamentId: router.query.tournamentId
      ? router.query.tournamentId.toString()
      : "",
  });

  if (!tournamentData || isLoading) return <BreadcrumbsSkeleton />;

  const checkIfPathIsEdit = (pathname: string) => {
    if (!pathname) return;

    if (!pathname.includes("edit")) return false;

    return true;
  };

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

        <li>
          <div className="flex items-center">
            <ChevronRightIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <Link
              href={`/tournament/${tournamentData.id}`}
              className={`ml-4 text-sm font-medium  ${
                checkIfPathIsEdit(router.asPath)
                  ? "text-gray-500 hover:text-gray-700"
                  : "text-white"
              }`}
            >
              {tournamentData.name}
            </Link>
          </div>
        </li>

        {checkIfPathIsEdit(router.asPath) && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon
                className="h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              <Link
                href={`/tournament/${tournamentData.id}/edit`}
                className={`ml-4 text-sm font-medium  ${
                  !checkIfPathIsEdit(router.asPath)
                    ? "text-gray-500 hover:text-gray-700"
                    : "text-white"
                }`}
              >
                Edit Tournament
              </Link>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
}
