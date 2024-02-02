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
        <h4 className="font-semibold text-lg text-gray-500 leading-tight"></h4>
        <div>
          <div>
            <Button key="approve_button" type="button" onClick={() => handleValidationClick(1)}>
              <span>&#128994;</span>
            </Button>
            <Button key="orange_button" type="button" onClick={() => handleValidationClick(0)}>
              <span>&#128992;</span>
            </Button>
            <Button key="reject_button" type="button" onClick={() => handleValidationClick(-1)}>
              <span>&#128308;</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
