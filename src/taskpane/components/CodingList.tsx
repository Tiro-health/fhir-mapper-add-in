import React from "react";
import importCodingToCell from "../importCoding";
import { Coding } from "../types";
import Button from "./Button";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const SYSTEM_URI_TO_NAME: Record<string, string> = {
  "http://snomed.info/sct": "SNOMED-CT",
};

export const EXAMPLE_CODINGS: Coding[] = [
  {
    code: "123",
    display: "Test 1",
    system: "http://snomed.info/sct",
  },
  {
    code: "234",
    display: "Test 2",
    system: "http://snomed.info/sct",
  },
  {
    code: "345",
    display: "Test 3",
    system: "http://snomed.info/sct",
  },
];

function CodingList({ codings }: { codings: Coding[] }) {
  const handleClick = (coding: Coding) => {
    importCodingToCell(coding);
  };
  return (
    <ul role="list" className="divide-y divide-gray-100 bg-white border-gray-200 rounded-sm px-1">
      {codings.map((coding, i) => (
        <li key={`${coding.system}|${coding.code}-${i}`} className="relative  py-2">
          <div className="w-full flex gap-x-2">
            <div className="grow flex items-baseline gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900 grow">{coding.display}</p>
              <div>
                <span>
                  <code
                    className={classNames(
                      "text-gray-600 bg-gray-50 ring-gray-500/10",
                      "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {coding.code}
                  </code>
                  <a href={`http://snomed.info/sct/${coding.code}`} className="material-symbols-outlined text-xs">
                    open_in_new
                  </a>
                </span>
              </div>
              <div>
                {SYSTEM_URI_TO_NAME[coding.system] && (
                  <span className="text-sm text-gray-600">{SYSTEM_URI_TO_NAME[coding.system]}</span>
                )}
              </div>
            </div>
            <div>
              <Button type="button" onClick={() => handleClick(coding)}>
                Importeer
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CodingList;
