import * as React from "react";
import { createRoot } from "react-dom/client";
import "./taskpane.css";
import App from "./components/App";

/* global Office, module, require */

const title = "FHIR Mapper";

const rootElement: HTMLElement = document.getElementById("container");
const root = createRoot(rootElement);

/* Render application after Office initializes */
Office.onReady(() => {
  root.render(<App title={title} />);
});

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    root.render(NextApp);
  });
}
