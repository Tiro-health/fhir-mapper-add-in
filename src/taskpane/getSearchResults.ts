import { Coding } from "./types";
type SearchOptions = {
  fuzzy: boolean;
  count: number;
};
const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  fuzzy: true,
  count: 5,
};
async function getSearchResults(query: string, options: SearchOptions = DEFAULT_SEARCH_OPTIONS): Promise<Coding[]> {
  try {
    let searchResults: Coding[] = [];
    const searchParams = new URLSearchParams({
      filter: query,
      fuzzy: options.fuzzy.toString(),
      _format: "json",
      url: "http://snomed.info/sct?fhir_vs",
      count: options.count.toString(),
    });
    const url = new URL(`https://terminology.tiro.health/r5/ValueSet/$expand`);
    url.search = searchParams.toString();
    console.debug("Fetching " + url);
    const response = await fetch(url.href);
    if (!response.ok) {
      console.warn("Failed to fetch:\n" + response.body);
      return searchResults;
    }
    const responseJson = await response.json();
    const result = responseJson["expansion"]["contains"].map(({ code, display, system }) => ({
      code,
      display,
      system,
    }));
    return result;
  } catch (e) {
    console.debug("Request failed.");
    console.error(e);
  }
}

export default getSearchResults;
