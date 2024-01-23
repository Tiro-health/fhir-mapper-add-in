/** global Excel */

/**
 * Find a matching code
 * @customfunction MAP_DESCRIPTION
 * @param {string} description - the text to use.
 * @returns The result of the function code.
 */
// eslint-disable-next-line no-undef
export async function map_description(description: string): Promise<Excel.EntityCellValue | Excel.ErrorCellValue> {
  const encodedDescription = encodeURIComponent(description);
  try {
    const url = `https://fhir-mapper-wkrcomcqfq-ew.a.run.app/?text=${encodedDescription}`;
    console.log("Fetching " + url);
    const response = await fetch(url);
    console.log("HTTP status:" + response.status);
    console.log("Body: " + response.body);
    if (!response.ok) {
      console.log("Failed to fetch:\n" + response.body);
      return {
        errorType: "Connect",
        type: "Error",
      };
    }
    const contentType = response.headers.get("Content-Type");
    console.log("Content-Type:", contentType);
    // wait for response of API
    const responseBody = await response.json();
    // Get the first array in 'procedure.code'
    const procedureArray: any[] | undefined = responseBody["procedure.code"];
    const reasonCodeArray: any[] | undefined = responseBody["procedure.reasonCode"];
    const bodySiteArray: any[] | undefined = responseBody["procedure.bodySite"];
    const focalDeviceArray: any[] | undefined = responseBody["procedure.focalDevice"];
    const usedCodeArray: any[] | undefined = responseBody["procedure.usedCode"];
    console.log("reached this point");
    // eslint-disable-next-line no-undef
    const entity: Excel.EntityCellValue = {
      type: "Entity",
      text: JSON.stringify(procedureArray[0]["display"]),
      properties: {
        display: {
          type: "String",
          basicValue: JSON.stringify(procedureArray[0]["display"]),
        },
        code: {
          type: "String",
          basicValue: JSON.stringify(procedureArray[0]["code"]),
        },
        url: {
          type: "String",
          basicValue: `http://snomed.info/sct/${procedureArray[0]["code"]}`,
        },
        reasonCode: {
          type: "Entity",
          text: reasonCodeArray && reasonCodeArray[0] ? JSON.stringify(reasonCodeArray[0]["display"]) : "/",
          properties: {
            display: {
              type: "String",
              basicValue: reasonCodeArray && reasonCodeArray[0] ? JSON.stringify(reasonCodeArray[0]["display"]) : "/",
            },
            code: {
              type: "String",
              basicValue: reasonCodeArray && reasonCodeArray[0] ? JSON.stringify(reasonCodeArray[0]["code"]) : "/",
            },
            url: {
              type: "String",
              basicValue:
                reasonCodeArray && reasonCodeArray[0] ? `http://snomed.info/sct/${reasonCodeArray[0]["code"]}` : "/",
            },
          },
        },
        bodySite: {
          type: "Entity",
          text: bodySiteArray && bodySiteArray[0] ? JSON.stringify(bodySiteArray[0]["display"]) : "/",
          properties: {
            display: {
              type: "String",
              basicValue: bodySiteArray && bodySiteArray[0] ? JSON.stringify(bodySiteArray[0]["display"]) : "/",
            },
            code: {
              type: "String",
              basicValue: bodySiteArray && bodySiteArray[0] ? JSON.stringify(bodySiteArray[0]["code"]) : "/",
            },
            url: {
              type: "String",
              basicValue:
                bodySiteArray && bodySiteArray[0] ? `http://snomed.info/sct/${bodySiteArray[0]["code"]}` : "/",
            },
          },
        },
        focalDevice: {
          type: "Entity",
          text: focalDeviceArray && focalDeviceArray[0] ? JSON.stringify(focalDeviceArray[0]["display"]) : "/",
          properties: {
            display: {
              type: "String",
              basicValue:
                focalDeviceArray && focalDeviceArray[0] ? JSON.stringify(focalDeviceArray[0]["display"]) : "/",
            },
            code: {
              type: "String",
              basicValue: focalDeviceArray && focalDeviceArray[0] ? JSON.stringify(focalDeviceArray[0]["code"]) : "/",
            },
            url: {
              type: "String",
              basicValue:
                focalDeviceArray && focalDeviceArray[0] ? `http://snomed.info/sct/${focalDeviceArray[0]["code"]}` : "/",
            },
          },
        },
        usedCode: {
          type: "Entity",
          text: usedCodeArray && usedCodeArray[0] ? JSON.stringify(usedCodeArray[0]["display"]) : "/",
          properties: {
            display: {
              type: "String",
              basicValue: usedCodeArray && usedCodeArray[0] ? JSON.stringify(usedCodeArray[0]["display"]) : "/",
            },
            code: {
              type: "String",
              basicValue: usedCodeArray && usedCodeArray[0] ? JSON.stringify(usedCodeArray[0]["code"]) : "/",
            },
            url: {
              type: "String",
              basicValue:
                usedCodeArray && usedCodeArray[0] ? `http://snomed.info/sct/${usedCodeArray[0]["code"]}` : "/",
            },
          },
        },
      },
      layouts: {
        card: {
          title: {
            property: "display",
          },
          sections: [
            {
              layout: "List",
              title: "procedure",
              properties: ["display", "code", "url"],
            },
          ],
        },
      },
    };
    return entity;
  } catch (e) {
    console.log("Request failed.");
    console.error(e);
    return e;
  }
}

/**
 * Writes a message to console.log().
 * @customfunction LOG
 * @param message String to write.
 * @returns String to write.
 */
export function logMessage(message: string): string {
  console.log(message);

  return message;
}
