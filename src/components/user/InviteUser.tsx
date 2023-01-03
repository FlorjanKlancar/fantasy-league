import React, { useEffect, useState } from "react";
import AsyncSelect from "react-select/async";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import { trpc } from "../../utils/trpc";

const optionsDropdown = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

type DropDownType = {
  value: string;
  label: string;
};

function InviteUser() {
  const [location, setLocation] = useState("");
  const [searchOption, setSearchOption] = useState("");
  const { data, isLoading } = trpc.users.getUserByName.useQuery({
    username: searchOption,
  });

  useEffect(() => {
    setLocation(window.location.href);
  }, []);

  if (isLoading) return <div>Loading</div>;

  const fetchData = async (inputValue: string) => {
    setSearchOption(inputValue);
    new Promise((resolve) => {
      if (isLoading) return;

      resolve(data);
    });

    const dropdownData = data?.map((user) => {
      return {
        label: user.full_name ?? user.email,
        value: user.full_name ?? user.email,
      };
    });

    return dropdownData;
  };

  /*   const promiseOptions = (inputValue: string) => {
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(setSearchOption(inputValue));
      }, 1000);
    });

    return data;
  };
 */

  console.log({ data });
  return (
    <div className="z-50">
      <h2 className="my-3 text-sm	font-bold uppercase leading-4">
        Invite players to this tournament
      </h2>

      <AsyncSelect
        isMulti
        cacheOptions
        defaultOptions
        /* loadOptions={fetchData} */
        className="my-react-select-container"
        classNamePrefix="my-react-select"
      />

      <div className="py-8">
        <h2 className="my-3 text-sm	font-bold uppercase leading-4">
          Invite players using this link
        </h2>

        <div className="flex space-x-2">
          <input
            type="text"
            value={`${location}`}
            className="input-bordered input w-full "
            readOnly
          />
          <CopyToClipboard
            text={`${location}`}
            onCopy={() => toast.success("URL copied to clipboard")}
          >
            <button className="btn-outline btn-square btn">
              <ClipboardIcon className="h-5 w-5" />
            </button>
          </CopyToClipboard>
        </div>
      </div>

      <div>
        <button className="btn-primary btn w-full" type="button">
          Send invite
        </button>
      </div>
    </div>
  );
}

export default InviteUser;
