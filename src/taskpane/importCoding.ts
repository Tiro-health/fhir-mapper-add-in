import createCodingEntityCard from "./createCodingEntityCard";
import { Coding } from "./types";

export default async function importCodingToCell({ code, display, system, semantic_axis }: Coding) {
  // eslint-disable-next-line no-undef
  await Excel.run(async (context) => {
    const activeCell = context.workbook.getActiveCell();
    activeCell.valuesAsJson = [[createCodingEntityCard({ code, display, system, semantic_axis })]];
    await context.sync();
  });
}
