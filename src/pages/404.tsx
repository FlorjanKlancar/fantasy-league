import { useRouter } from "next/router";

export default function NotFoundPage() {
  const router = useRouter();

  const pushToHomepage = () => {
    router.push("/");
  };

  return (
    <>
      <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-slate-200 sm:pl-6">
                <h1 className="text-4xl font-bold tracking-tight text-secondary sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 text-base text-slate-200">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <button
                  className="btn-md btn bg-primary text-white hover:bg-primary/60"
                  onClick={() => pushToHomepage}
                >
                  Go back home
                </button>
                <button className="btn-md btn bg-secondary text-white hover:bg-secondary/60">
                  Contact Support
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
