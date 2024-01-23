import createCodingEntityCard from "./createCodingEntityCard";

/** global Excel */
type Coding = {
  code: string;
  display: string;
  system: string;
  version?: string;
};

export default async function importCodingToCell({ code, display, system }: Coding) {
  // eslint-disable-next-line no-undef
  await Excel.run(async (context) => {
    const activeCell = context.workbook.getActiveCell();
    activeCell.valuesAsJson = [[createCodingEntityCard({ code, display, system })]];
    await context.sync();
  });
}
