import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PlanetPage from "./planets-page/planets-page.component.js";

export default function Root(props) {
  return (
    <div className="mt-16">
      <BrowserRouter>
        <Route path="/planets" component={PlanetPage} />
      </BrowserRouter>
    </div>
  );
}
