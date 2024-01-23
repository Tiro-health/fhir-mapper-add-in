import React from "react";
import CodingList, { EXAMPLE_CODINGS } from "./AlternativeSuggestions";
import { Coding } from "../types";
import Button from "./Button";

interface AppProps {
  title: string;
}

const App = ({ title }: AppProps) => {
  const [searchResults, setSearchResults] = React.useState<Coding[]>([]);
  const [alternativeSuggestions, setAlternativeSuggestions] = React.useState<Coding[]>(EXAMPLE_CODINGS);

  return (
    <div className="px-2 py-5 divid-y-gray bg-gray-50/50 h-full">
      <h2 className="mx-2 font-semibold text-xl text-blue-800 leading-tight">{title}</h2>
      <main className="mt-8 px-2 flex flex-col gap-y-8">
        <section className="border-b border-gray-200 pb-4">
          <div className="flex gap-x-3">
            <h4 className="font-semibold text-lg text-gray-900 leading-tight">Alternatieve suggesties</h4>
            <div>
              <button
                type="button"
                onClick={refreshAlternativeSuggestions}
                className=" bg-gray-50 flex items-center justify-center border border-gray-400 rounded-lg hover:cursor-pointer"
              >
                <span className="block material-symbols-outlined text-base h-6 w-6">sync</span>
              </button>
            </div>
          </div>
          <CodingList codings={EXAMPLE_CODINGS} />
        </section>
        <section className="">
          <h4 className="font-semibold text-lg text-gray-900 leading-tight">Zoek een andere code</h4>
          <form className="flex gap-x-3 mb-4" onSubmit={handleSearch}>
            <input
              type="text"
              className="flex-1 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Zoek op code of omschrijving"
            />
            <Button type="submit">Zoek</Button>
          </form>
          {searchResults.length == 0 ? (
            <p className="text-gray-500 text-center">Geen resultaten</p>
          ) : (
            <CodingList codings={searchResults} />
          )}
        </section>
      </main>
    </div>
  );

  function refreshAlternativeSuggestions() {
    setAlternativeSuggestions(EXAMPLE_CODINGS);
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearchResults(EXAMPLE_CODINGS);
  }
};

export default App;
