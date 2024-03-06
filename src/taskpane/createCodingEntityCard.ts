import { Coding } from "./types";
/** global Excel */

// eslint-disable-next-line no-undef
export default function createCodingEntityCard({ display, code }: Coding): Excel.EntityCellValue {
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
        basicValue: code
      },
      system: {
        type: "String",
        basicValue: "http://snomed.info/sct",
      },
    },
  };
}
