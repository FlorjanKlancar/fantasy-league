import { CheckIcon } from "@heroicons/react/24/outline";
import React from "react";

type Props = {
  props: any;
  steps: any;
};

function Nav(props: any) {
  console.log(props.currentStep);
  const tailwindNav = (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="my-8 divide-y divide-gray-300 rounded-md border border-secondary bg-slate-900 md:flex md:divide-y-0"
      >
        {props.steps.map((step: any, stepIdx: number) => (
          <li
            key={step.name}
            className="relative hover:cursor-pointer md:flex md:flex-1"
            onClick={() => props.goToStep(stepIdx + 1)}
          >
            {step.status === "Completed" ? (
              <a className="group flex w-full items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="ml-4 text-sm font-medium ">{step.name}</span>
                </span>
              </a>
            ) : step.status === "current" ? (
              <a
                className="flex items-center px-6 py-4 text-sm font-medium"
                aria-current="step"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-600">
                  <span className="text-indigo-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-indigo-600">
                  {step.name}
                </span>
              </a>
            ) : (
              <a className="group flex items-center">
                <span className="flex items-center px-6 py-4 text-sm font-medium">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300 group-hover:border-gray-400">
                    <span className="text-gray-500 ">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-gray-500 ">
                    {step.name}
                  </span>
                </span>
              </a>
            )}

            {stepIdx !== props.steps.length - 1 ? (
              <>
                <div
                  className="absolute top-0 right-0 hidden h-full w-5 md:block"
                  aria-hidden="true"
                >
                  <svg
                    className="h-full w-full text-gray-300"
                    viewBox="0 0 22 80"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 -2L20 40L0 82"
                      vectorEffect="non-scaling-stroke"
                      stroke="currentcolor"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );

  return <div>{tailwindNav}</div>;
}

export default Nav;
