import createCodingEntityCard from "./createCodingEntityCard";

/** global Excel */
type Coding = {
  code: string;
  display: string;
  system: string;
  version?: string;
};

export default async function importCodingNewLine({ code, display, system }: Coding) {
  // eslint-disable-next-line no-undef
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const activeCell = context.workbook.getActiveCell();
    activeCell.load({ rowIndex: true, columnIndex: true });
    await context.sync();
    const nextRow = activeCell.getRowsBelow();
    nextRow.load({ rowIndex: true, address: true });
    await context.sync();
    console.log(nextRow.address);
    console.log(nextRow.rowIndex);
    // eslint-disable-next-line no-undef
    nextRow.getEntireRow().insert(Excel.InsertShiftDirection.down);
    await context.sync();
    const newCell = sheet.getCell(nextRow.rowIndex, activeCell.columnIndex);
    newCell.valuesAsJson = [[createCodingEntityCard({ code, display, system })]];
    await context.sync();
  });
}
