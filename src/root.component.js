import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PlanetPage from "./planets-page/planets-page.component.js";

export default function Root(props) {
  return (
    <BrowserRouter>
      <Route path="/planets" component={PlanetPage} />
    </BrowserRouter>
  );
}
