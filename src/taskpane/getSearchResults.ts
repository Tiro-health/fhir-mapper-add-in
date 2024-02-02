import { Coding } from "./types";
type SearchOptions = {
  fuzzy: boolean;
  count: number;
};
const DEFAULT_SEARCH_OPTIONS: SearchOptions = {
  fuzzy: true,
  count: 5,
};

const RESOURCE_TYPE: object = {
  procedure: 71388002,
  body_structure: 123037004,
  physical_object: 260787004,
  clinical_finding: 404684003,
  observable_entity: 363787002,
};

async function getSearchResults(
  query: string,
  valuesets: string[],
  options: SearchOptions = DEFAULT_SEARCH_OPTIONS
): Promise<Coding[]> {
  try {
    const valueset_ref = {
      resourceType: "ValueSet",
      status: "active",
      url: "random",
      compose: {
        include: [
          {
            system: "http://snomed.info/sct",
            filter: valuesets.map((valueset) => ({
              property: "concept",
              op: "is-a",
              value: RESOURCE_TYPE[valueset],
            })),
          },
        ],
      },
    };
    let searchResults: Coding[] = [];
    const searchParams = new URLSearchParams({
      filter: query,
      fuzzy: options.fuzzy.toString(),
      _format: "json",
      url: "http://snomed.info/sct?fhir_vs",
      count: options.count.toString(),
    });
    const headers = {
      "Content-Type": "application/fhir+json",
    };
    const url = new URL(`https://terminology.tiro.health/r5/ValueSet/$expand`);
    url.search = searchParams.toString();
    console.log(valueset_ref);
    console.log("Fetching " + url);
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(valueset_ref),
    });
    console.log(response);
    if (!response.ok) {
      console.warn("Failed to fetch:\n" + response.body);
      return searchResults;
    }
    const responseJson = await response.json();
    const result = responseJson["expansion"]["contains"].map(({ code, display, system, property }) => ({
      code,
      display,
      system,
      semantic_axis: property[0]?.valueCoding?.display,
    }));
    return result;
  } catch (e) {
    console.debug("Request failed.");
    console.error(e);
  }
}

export default getSearchResults;
