import React from "react";
import Button from "./Button";
import CodingList from "./CodingList";
import getSearchResults from "../getSearchResults";
import { useQuery } from "@tanstack/react-query";

export default function SearchPanel() {
  const [query, setQuery] = React.useState<string | null>();
  const {
    data: searchResults,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["search", query],
    queryFn: () => getSearchResults(query),
    enabled: !!query,
    placeholderData: [],
  });
  console.log({ isFetching, isLoading });
  return (
    <section className="">
      <h4 className="font-semibold text-lg text-gray-500 leading-tight">Zoek een andere code</h4>
      <form className="mt-2 mb-4 flex gap-x-3" onSubmit={handleSearch}>
        <input
          name="query"
          type="text"
          className="flex-1 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          placeholder="Zoek op code of omschrijving"
        />
        <Button type="submit" className="flex align-middle">
          <span className="sr-only">Zoek</span>
          <span className="material-symbols-outlined">search</span>
        </Button>
      </form>
      {isFetching ? (
        <p className="text-gray-500 text-center">Laden...</p>
      ) : searchResults.length == 0 ? (
        <p className="text-gray-500 text-center">Geen resultaten</p>
      ) : (
        <CodingList codings={searchResults} />
      )}
    </section>
  );

  async function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get("query");
    if (typeof query !== "string") return;
    setQuery(query.trim());
    if (!query) return;
  }
}
