import React from "react";
import getAlternativeResults from "../getAlternativeSuggestions";
import { Coding } from "../types";
import CodingList from "./CodingList";

export default function AlternativeSuggestions() {
  const [alternativeSuggestions, setAlternativeSuggestions] = React.useState<Coding[]>([]);

  return (
    <section className="border-b border-gray-200 pb-4">
      <div className="flex gap-x-3">
        <h4 className="font-semibold text-lg text-gray-500 leading-tight">Alternative suggestions</h4>
        <div>
          <button
            type="button"
            onClick={refreshAlternativeSuggestions}
            className=" bg-gray-50 flex items-center justify-center border border-gray-400 rounded-lg hover:cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <span className="block material-symbols-outlined text-base h-6 w-6">sync</span>
          </button>
        </div>
      </div>
      {alternativeSuggestions.length == 0 ? (
        <p className="text-sm text-gray-600">
          Select a cell and push &ldquo;sync
          <span className="inline relative top-0.5 material-symbols-outlined text-sm">sync</span>
          &rdquo;
        </p>
      ) : (
        <CodingList codings={alternativeSuggestions} />
      )}
    </section>
  );

  async function refreshAlternativeSuggestions() {
    const alternatives = await getAlternativeResults();
    console.log({ alternatives });
    setAlternativeSuggestions(alternatives);
  }
}
