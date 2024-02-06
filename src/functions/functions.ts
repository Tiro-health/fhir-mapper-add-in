/*÷* global Excel */
//const SERVER = "http://localhost:8000";

import { CodingMatch, ProcedureMatchSchema } from "./schema";

const SERVER = "https://fhir-mapper-wkrcomcqfq-ew.a.run.app";

/**
 * Map a description to a FHIR Procedure resource
 * @customfunction MAP_DESCRIPTION
 * @param {string} description - the text to use.
 * @returns The result of the function code.
 */
// eslint-disable-next-line no-undef
export async function map_description(description: string): Promise<Excel.EntityCellValue | Excel.ErrorCellValue> {
  const encodedDescription = encodeURIComponent(description);
  try {
    const url = `${SERVER}/?text=${encodedDescription}`;
    const response = await fetch(url);
    if (!response.ok) {
      return {
        errorType: "Connect",
        type: "Error",
      };
    }
    // wait for response of API
    const responseBody = await response.json();

    return buildEntityCard(responseBody);
  } catch (e) {
    console.log("Request failed.");
    console.error(e);
    return e;
  }
}

// const UNKOWN_SYMBOL = "❓";
/**
 * Parse a raw JSON result into an entity card
 * @customfunction PARSE_RESULT
 * @param {string} raw - Raw JSON result.
 * @returns - Entity card with structured results
 */
// eslint-disable-next-line no-undef
export default async function parseResult(raw: string): Promise<Excel.EntityCellValue | Excel.ErrorCellValue> {
  try {
    const cleaned = raw.replace(/'/g, '"');
    const deserialized = JSON.parse(cleaned);
    return buildEntityCard(deserialized);
  } catch (e) {
    console.log("Request failed.");
    console.error(e);
    return {
      type: "Error",
      errorType: "Connect",
    };
  }
}

// eslint-disable-next-line no-undef
function buildEntityCard(deserialized: unknown): Excel.EntityCellValue | Excel.ErrorCellValue {
  const parsed = ProcedureMatchSchema.safeParse(deserialized);
  if (!parsed.success) {
    return {
      type: "Error",
      errorType: "Value",
      errorSubType: "Unknown",
      basicValue: "Failed to parse JSON result.",
    };
  }
  const { data } = parsed;
  const inputDescription = data["input_description"];
  const procedureCode = data["code"] as CodingMatch[];
  const reasonCode = data["reasoncode"] as CodingMatch[];
  const bodySite = data["bodysite"] as CodingMatch[];
  const focalDevice = data["focaldevice"] as CodingMatch[];
  const usedCode = data["usedcode"] as CodingMatch[];
  const emptyCoding = { display: "/", code: "/", semantic_axis: "/", score: 0, prefered_term: "/" };
  // eslint-disable-next-line no-undef
  const properties: [string, Excel.EntityPropertyType | Excel.EntityCellValue][] = [];
  // eslint-disable-next-line no-undef
  const altproperties: [string, Excel.EntityPropertyType | Excel.EntityCellValue][] = [];

  if (procedureCode.length > 0) {
    // add procedureCode display, code, score, system
    Object.entries("procedure");
    const procedureProperties = getCodingMatchEntity(procedureCode[0]);
    if (procedureCode.length > 1) {
      procedureCode
        .slice(1, procedureCode.length)
        .forEach((value, index) => altproperties.push([index.toString(), getCodingMatchEntity(value)]));
      // eslint-disable-next-line no-undef
      const alternatives: Excel.EntityCellValue = {
        type: "Entity",
        text: "Alternatives",
        properties: Object.fromEntries(altproperties),
      };
      procedureProperties["properties"]["alternatives"] = alternatives;
    }
    properties.push(["procedureCode", procedureProperties]);
  }
  if (reasonCode.length > 0) {
    // add reasonCode display, code, score, system
    properties.push(["reasonCode", getCodingMatchEntity(reasonCode[0])]);
  } else {
    properties.push(["reasonCode", getCodingMatchEntity(emptyCoding)]);
  }
  if (bodySite.length > 0) {
    // add bodySite display, code, score, system
    properties.push(["bodySite", getCodingMatchEntity(bodySite[0])]);
  } else {
    properties.push(["bodySite", getCodingMatchEntity(emptyCoding)]);
  }
  if (focalDevice.length > 0) {
    // add focalDevice display, code, score, system
    properties.push(["focalDevice", getCodingMatchEntity(focalDevice[0])]);
  } else {
    properties.push(["focalDevice", getCodingMatchEntity(emptyCoding)]);
  }
  if (usedCode.length > 0) {
    // add usedCode display, code, score, system
    properties.push(["usedCode", getCodingMatchEntity(usedCode[0])]);
  } else {
    properties.push(["usedCode", getCodingMatchEntity(emptyCoding)]);
  }

  // eslint-disable-next-line no-undef
  const entity: Excel.EntityCellValue = {
    type: "Entity",
    text: "Results based on " + inputDescription,
    properties: Object.fromEntries(properties),
    layouts: {
      card: {
        title: "APIresult",
        sections: [
          {
            layout: "List",
            title: "Procedure",
            properties: ["procedureCode"],
          },
          {
            layout: "List",
            title: "Attributes",
            properties: ["bodySite", "reasonCode", "focalDevice", "usedCode"],
          },
        ],
      },
    },
  };
  return entity;
}

// eslint-disable-next-line no-undef
function getCodingMatchProperties(match: CodingMatch): Record<string, Excel.EntityPropertyType> {
  return {
    display: {
      type: "String",
      basicValue: match.display,
    },
    code: {
      type: "String",
      basicValue: match.code,
      propertyMetadata: {
        attribution: [
          {
            sourceText: "SNOMED-CT browser",
            sourceAddress: `http://snomed.info/sct/${match.code}`,
          },
        ],
      },
    },
    score: {
      type: "Double",
      basicValue: match.score,
    },
    semanticAxis: {
      type: "String",
      basicValue: match ? match.semantic_axis : "/",
    },
    preferredTerm: {
      type: "String",
      basicValue: match ? match.prefered_term : "/",
    },
    system: {
      type: "String",
      basicValue: match ? `http://snomed.info/sct/` : "/",
    },
  };
}

// eslint-disable-next-line no-undef
function getCodingMatchEntity(match: CodingMatch): Excel.EntityCellValue | Excel.EntityPropertyType {
  return {
    type: "Entity",
    text: match.display,
    properties: getCodingMatchProperties(match),
  };
}
