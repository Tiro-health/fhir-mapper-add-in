import React from "react";
import Select from "react-select";
import Button from "./Button";
import CodingList from "./CodingList";
import getSearchResults from "../getSearchResults";
import { useQuery } from "@tanstack/react-query";

export default function SearchPanel() {
  const [query, setQuery] = React.useState<string | null>();
  const [searchOptions, setSearchOptions] = React.useState<string[]>([]);
  const selectoptions = [
    { value: "procedure", label: "Procedure" },
    { value: "body_structure", label: "Body structure" },
    { value: "physical_object", label: "Physical object" },
    { value: "clinical_finding", label: "Clinical finding" },
    { value: "observable_entity", label: "Observable entity" },
  ];
  const {
    data: searchResults,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["search", query], //searchOptions],
    queryFn: () => getSearchResults(query, searchOptions),
    enabled: !!query,
    placeholderData: [],
  });
  console.log({ isFetching, isLoading });

  const onSelectOptions = (selectedOptions) => {
    let options = selectedOptions.map((o: any) => o.value);
    console.log("selected options", options);
    setSearchOptions(options);
  };

  return (
    <section className="">
      <h4 className="font-semibold text-lg text-gray-500 leading-tight">Search a different code</h4>
      <form className="mt-2 mb-4 flex gap-x-3" onSubmit={handleSearch}>
        <input
          name="query"
          type="text"
          className="flex-1 py-1.5 px-2 block w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          placeholder="Search for a code or a description"
        />
        <Button type="submit" className="flex align-middle">
          <span className="sr-only">Search</span>
          <span className="material-symbols-outlined">search</span>
        </Button>
      </form>
      <Select options={selectoptions} isMulti onChange={onSelectOptions} />
      {isFetching ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : searchResults.length == 0 ? (
        <p className="text-gray-500 text-center">No results</p>
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
