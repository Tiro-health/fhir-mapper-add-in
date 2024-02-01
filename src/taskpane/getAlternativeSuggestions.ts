import { Coding } from "./types";

export default async function getAlternativeResults(): Promise<Coding[]> {
  let procedureArray: Coding[] = [];
  // eslint-disable-next-line no-undef
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const activeCell = context.workbook.getActiveCell();
    activeCell.load({ rowIndex: true });
    await context.sync();
    const range = sheet.getUsedRange().find("JSONResults", { completeMatch: true, matchCase: false });
    range.load("columnIndex");
    await context.sync();
    const full_result = sheet.getCell(activeCell.rowIndex, range.columnIndex);
    full_result.load({ values: true });
    await context.sync();
    // wait for response of API
    const resultBody = JSON.parse(full_result.values[0][0]);
    // Get the first array in 'procedure.code'
    procedureArray = resultBody["code"].map((obj: Record<string, string>) => ({
      code: obj["code"],
      display: obj["display"],
      semantic_axis: obj["semantic_axis"],
      system: "http://snomed.info/sct/",
    })) as Coding[];
    console.log(procedureArray);
    await context.sync();
  });
  return procedureArray;
}
