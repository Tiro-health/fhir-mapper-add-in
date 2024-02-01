import createCodingEntityCard from "./createCodingEntityCard";
import { Coding } from "./types";

export default async function importCodingNewLine({ code, display, system, semantic_axis }: Coding) {
  // eslint-disable-next-line no-undef
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const activeCell = context.workbook.getActiveCell();
    activeCell.load({ rowIndex: true, columnIndex: true });
    const activeRow = activeCell.getEntireRow();
    await context.sync();
    const nextRow = activeCell.getRowsBelow();
    nextRow.load({ rowIndex: true, address: true });
    await context.sync();
    // Insert empty row
    // eslint-disable-next-line no-undef
    nextRow.getEntireRow().insert(Excel.InsertShiftDirection.down).copyFrom(activeRow);
    await context.sync();
    // Insert duplicate of row
    // nextRow.getEntireRow().copyFrom(activeCell.getEntireRow());
    // await context.sync();
    const newCell = sheet.getCell(nextRow.rowIndex, activeCell.columnIndex);
    newCell.valuesAsJson = [[createCodingEntityCard({ code, display, system, semantic_axis })]];
    await context.sync();
  });
}
