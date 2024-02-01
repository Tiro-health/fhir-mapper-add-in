/* eslint-disable prettier/prettier */
import { Coding } from "./types";
/** global Excel */

// eslint-disable-next-line no-undef
export default function createCodingEntityCard({ code, display, system, semantic_axis }: Coding): Excel.EntityCellValue {
  return {
    type: "Entity",
    text: display,
    properties: {
      display: {
        type: "String",
        basicValue: display,
      },
      code: {
        type: "String",
        basicValue: code,
      },
      system: {
        type: "String",
        basicValue: system, // "http://snomed.info/sct",
      },
      semantic_axis: {
        type: "String",
        basicValue: semantic_axis,
      },
    },
  };
}
