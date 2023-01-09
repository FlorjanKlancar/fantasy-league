import dayjs from "dayjs";
import InvitePlayersModule from "./InvitePlayersModule";

export default function NewTournamentForm() {
  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-2 ">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium capitalize leading-6 text-white">
                Tournament basic information
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-1 md:mt-0">
            <form>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-slate-800 px-4 py-5 sm:p-6">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-bold capitalize text-white">
                        Tournament name
                      </span>
                    </label>
                    <input
                      type="text"
                      placeholder="Fifa World Cup 2023"
                      className="input-bordered input w-full placeholder:capitalize"
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        Error msg
                      </span>
                    </label>
                  </div>

                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-bold capitalize text-white">
                        Tournament description
                      </span>
                      <span className="label-text text-xs">Optional</span>
                    </label>
                    <textarea
                      placeholder="Optional tournament description"
                      className="input-bordered input w-full placeholder:capitalize"
                    ></textarea>
                    <label className="label">
                      <span className="label-text-alt text-error">
                        Error msg
                      </span>
                    </label>
                  </div>

                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text font-bold capitalize text-white">
                        Tournament end date
                      </span>
                    </label>
                    <input
                      type="date"
                      className="input-bordered input w-full"
                      value={dayjs().format("DD.MM.YYYY")}
                    />
                    <label className="label">
                      <span className="label-text-alt text-error">
                        Error msg
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-secondary" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium capitalize leading-6 text-white">
                Invite other players
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                You can invite other players with invitation or share them the
                link
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-1 md:mt-0">
            <form>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-slate-800 px-4 py-5 sm:p-6">
                  <InvitePlayersModule />
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
