import { TrophyIcon } from "@heroicons/react/20/solid";

const trophies = [
  {
    icon: (
      <div className="relative flex w-full">
        <TrophyIcon className="h-24 w-24 text-amber-600" />
      </div>
    ),
    description: (
      <div>
        <p>First place - 100€</p>
      </div>
    ),
  },
  {
    icon: (
      <div className="relative flex w-full items-center">
        <TrophyIcon className="h-20 w-20 text-zinc-500" />
      </div>
    ),
    description: (
      <div>
        <p>Second place - 60€</p>
      </div>
    ),
  },
  {
    icon: (
      <div className="relative flex w-full items-center">
        <TrophyIcon className="h-16 w-16 text-yellow-900" />
      </div>
    ),
    description: (
      <div>
        <p>Third place - 40€</p>
      </div>
    ),
  },
];

export default function TournamentPrizes() {
  return (
    <div className="mt-5 overflow-hidden rounded border-2 border-primary/20 bg-slate-800 sm:rounded-md">
      <div className="bg-slate-900 p-4 text-sm font-bold	uppercase leading-4">
        <h2>Total prize pool</h2>
      </div>
      <ul role="list" className="divide-y divide-slate-600">
        {trophies.map((trophy, i: number) => (
          <li key={i}>
            <a className="block hover:bg-slate-900/50">
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="flex min-w-0 flex-1 items-center">
                  <div className="w-1/3">{trophy.icon}</div>

                  <div className="flex w-full justify-center text-xl">
                    {trophy.description}
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
