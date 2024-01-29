/** global Excel */

export default async function validateResult(validation: number) {
  // eslint-disable-next-line no-undef
  await Excel.run(async (context) => {
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const activeCell = context.workbook.getActiveCell();
    activeCell.load({ rowIndex: true });
    await context.sync();

    let validationColumn = sheet
      .getUsedRangeOrNullObject()
      .findOrNullObject("Validation", { completeMatch: true, matchCase: false });
    validationColumn.load({ address: true });
    await context.sync();

    if (validationColumn.address == undefined) {
      // Create new validation column as first column
      validationColumn = sheet.getRangeByIndexes(0, 0, 100000, 1);
      validationColumn.load({ rowIndex: true, columnIndex: true, address: true });
      await context.sync();
      // eslint-disable-next-line no-undef
      validationColumn = validationColumn.insert(Excel.InsertShiftDirection.right);
      validationColumn.load({ columnIndex: true });
      // Autofit column width

      await context.sync();
      sheet.getCell(0, 0).values = [["Validation"]];
      // eslint-disable-next-line no-undef
      const conditionalFormat = validationColumn.conditionalFormats.add(Excel.ConditionalFormatType.iconSet);
      const iconSetCF = conditionalFormat.iconSet;
      // eslint-disable-next-line no-undef
      iconSetCF.style = Excel.IconSet.threeTrafficLights1;
      iconSetCF.showIconOnly = true;

      /*
          The iconSetCF.criteria array is automatically prepopulated with
          criterion elements whose properties have been given default settings.
          You can't write to each property of a criterion directly. Instead,
          replace the whole criteria object.
  
          With a "three*" icon set style, such as "threeTriangles", the third
          element in the criteria array (criteria[2]) defines the "top" icon;
          e.g., a green triangle. The second (criteria[1]) defines the "middle"
          icon. The first (criteria[0]) defines the "low" icon, but it
          can often be left empty as the following object shows, because every
          cell that does not match the other two criteria always gets the low
          icon.            
      */
      iconSetCF.criteria = [
        {} as any,
        {
          // eslint-disable-next-line no-undef
          type: Excel.ConditionalFormatIconRuleType.number,
          // eslint-disable-next-line no-undef
          operator: Excel.ConditionalIconCriterionOperator.greaterThanOrEqual,
          formula: "=0",
        },
        {
          // eslint-disable-next-line no-undef
          type: Excel.ConditionalFormatIconRuleType.number,
          // eslint-disable-next-line no-undef
          operator: Excel.ConditionalIconCriterionOperator.greaterThanOrEqual,
          formula: "=1",
        },
      ];
      await context.sync();
    }
    validationColumn.load({ columnIndex: true });
    await context.sync();
    validationColumn.format.autofitColumns();
    validationColumn.format.horizontalAlignment = "Center";

    const validationCell = sheet.getCell(activeCell.rowIndex, validationColumn.columnIndex);
    validationCell.values = [[validation]];
  });
}
