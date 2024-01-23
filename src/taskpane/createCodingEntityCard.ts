import { Coding } from "./types";
/** global Excel */

// eslint-disable-next-line no-undef
export default function createCodingEntityCard({ display }: Coding): Excel.EntityCellValue {
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
        basicValue: "123456789",
      },
      system: {
        type: "String",
        basicValue: "http://snomed.info/sct",
      },
    },
  };
}
