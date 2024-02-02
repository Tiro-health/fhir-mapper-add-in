import React from "react";
import importCodingToCell from "../importCoding";
import importCodingNewLine from "../importNewLine";
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
    semantic_axis: "Procedure",
  },
  {
    code: "234",
    display: "Test 2",
    system: "http://snomed.info/sct",
    semantic_axis: "Condition",
  },
  {
    code: "345",
    display: "Test 3",
    system: "http://snomed.info/sct",
    semantic_axis: "Body Structure",
  },
];

function CodingList({ codings }: { codings: Coding[] }) {
  const handleClick = (coding: Coding) => {
    importCodingToCell(coding);
  };
  const handleNewLineClick = (coding: Coding) => {
    importCodingNewLine(coding);
  };

  return (
    <ul role="list" className="divide-y divide-gray-100 bg-white border-gray-200 rounded-sm px-1">
      {codings.map((coding, i) => (
        <li key={`${coding.system}|${coding.code}-${i}`} className="relative  py-2">
          <div className="w-full flex gap-x-2">
            <div className="grow flex items-baseline gap-x-3">
              <p className="text-sm font-semibold leading-6 text-gray-900 grow">{coding.display}</p>
              <div className="flex">
                <div className="flex flex-col text-right">
                  <code
                    className={classNames(
                      "text-gray-600 bg-gray-50 ring-gray-500/10",
                      "rounded-md mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset",
                      "text-right"
                    )}
                  >
                    {coding.code}
                  </code>
                  <code
                    className={classNames(
                      "text-gray-600 bg-gray-50 ring-gray-500/10",
                      "rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    {coding.semantic_axis}
                  </code>
                </div>
                <a href={`http://snomed.info/sct/${coding.code}`} className="material-symbols-outlined text-xs">
                  open_in_new
                </a>
              </div>
              <div>
                {SYSTEM_URI_TO_NAME[coding.system] && (
                  <span className="text-sm text-gray-600">{SYSTEM_URI_TO_NAME[coding.system]}</span>
                )}
              </div>
            </div>
            <div>
              <Button key="import_button" type="button" onClick={() => handleClick(coding)} style={{ display: "flex" }}>
                <span className="material-symbols-outlined">place_item</span>
              </Button>
            </div>
            <div>
              <Button
                key="add_button"
                type="button"
                onClick={() => handleNewLineClick(coding)}
                style={{ display: "flex", fontSize: "8px" }}
              >
                <span className="material-symbols-outlined">add</span>
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CodingList;
