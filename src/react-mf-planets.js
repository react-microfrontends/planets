import React from "react";
import ReactDOM from "react-dom";
import ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  ReactDOMClient,
  rootComponent: Root,
  errorBoundary(err, info, props) {
    return <div className="mt-16">Error</div>;
  },
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
