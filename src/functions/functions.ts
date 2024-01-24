/** global Excel */
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

const UNKOWN_SYMBOL = "❓";
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
  const procedureCode = data["procedure.code"] as CodingMatch[];
  const reasonCode = data["procedure.reasonCode"] as CodingMatch[];
  const bodySite = data["procedure.bodySite"] as CodingMatch[];
  const focalDevice = data["procedure.focalDevice"] as CodingMatch[];
  const usedCode = data["procedure.usedCode"] as CodingMatch[];
  // const emptyCoding = [{ display: "/", code: "/", semantic_axis: "/", score: 0 }] as CodingMatch[];
  // eslint-disable-next-line no-undef
  const properties: [string, Excel.EntityPropertyType][] = [];

  if (procedureCode.length > 0) {
    // add procedureCode display, code, score, system
    Object.entries(getCodingMatchProperties(procedureCode[0])).map((p) => properties.push(p));
  }
  if (reasonCode.length > 0) {
    // add reasonCode display, code, score, system
    properties.push(["reasonCode", getCodingMatchEntity(reasonCode[0])]);
  }
  // else {properties.push(["reasonCode", getCodingMatchEntity(emptyCoding)]);}
  if (bodySite.length > 0) {
    // add bodySite display, code, score, system
    properties.push(["bodySite", getCodingMatchEntity(bodySite[0])]);
  }
  if (focalDevice.length > 0) {
    // add focalDevice display, code, score, system
    properties.push(["focalDevice", getCodingMatchEntity(focalDevice[0])]);
  }
  if (usedCode.length > 0) {
    // add usedCode display, code, score, system
    properties.push(["usedCode", getCodingMatchEntity(usedCode[0])]);
  }

  if (procedureCode.length > 1) {
    // add secondOption for procedureCode
    // eslint-disable-next-line no-undef
    const secondOption: Excel.EntityPropertyType = {
      type: "Entity",
      text: procedureCode[1]?.display ?? UNKOWN_SYMBOL,
      properties: getCodingMatchProperties(procedureCode[1]),
    };
    properties.push(["secondOption", secondOption]);
  }

  // eslint-disable-next-line no-undef
  const entity: Excel.EntityCellValue = {
    type: "Entity",
    text: procedureCode[0]?.display ?? UNKOWN_SYMBOL,
    properties: Object.fromEntries(properties),
    layouts: {
      card: {
        title: {
          property: "display",
        },
        sections: [
          {
            layout: "List",
            title: "procedure",
            properties: ["display", "code", "system", "score"],
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
    },
    score: {
      type: "Double",
      basicValue: match.score,
    },
    system: {
      type: "String",
      basicValue: match ? `http://snomed.info/sct/${match.code}` : "/",
      propertyMetadata: {
        attribution: [
          {
            sourceText: "SNOMED-CT browser",
            sourceAddress: `http://snomed.info/sct/${match.code}`,
          },
        ],
      },
    },
  };
}

// eslint-disable-next-line no-undef
function getCodingMatchEntity(match: CodingMatch): Excel.EntityCellValue {
  return {
    type: "Entity",
    text: match.display,
    properties: getCodingMatchProperties(match),
  };
}
