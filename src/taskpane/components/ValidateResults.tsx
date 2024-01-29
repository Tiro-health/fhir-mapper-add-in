import React from "react";
import validateResult from "../validateResult";
import Button from "./Button";

export default function ValidateResultsButtons() {
  const handleValidationClick = (validationNumber: number) => {
    validateResult(validationNumber);
  };
  return (
    <section className="flex flex-col">
      <div className="flex gap-x-3">
        <h4 className="font-semibold text-lg text-gray-500 leading-tight">Validate results</h4>
        <div>
          <div>
            <Button key="approve_button" type="button" onClick={() => handleValidationClick(1)}>
              Green
            </Button>
            <Button key="orange_button" type="button" onClick={() => handleValidationClick(0)}>
              Orange
            </Button>
            <Button key="reject_button" type="button" onClick={() => handleValidationClick(-1)}>
              Red
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
