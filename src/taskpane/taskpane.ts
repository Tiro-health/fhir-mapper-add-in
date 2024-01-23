/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, document, Excel, Office */
let _count = 0;
// The initialize function must be run each time a new page is loaded
Office.onReady(() => {
  document.getElementById("sideload-msg").style.display = "none";
  document.getElementById("app-body").style.display = "flex";
  //document.getElementById("run").onclick = run;
  updateCount(); // Update count on first task pane opening
  Office.addin.onVisibilityModeChanged((event) => {
    if (event.visibilityMode == "Taskpane") {
      updateCount(); // Update count on subsequent task pane openings
    }
  });
});

function updateCount() {
  _count++;
  document.getElementById("run").textContent = "Task pane opened " + _count + " times.";
}

export async function run() {
  try {
    await Excel.run(async (context) => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      range.format.fill.color = "yellow";

      await context.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}
