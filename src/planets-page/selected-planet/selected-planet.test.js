import SelectedPlanet from "./selected-planet.component.js";
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("selected-planet", () => {
  it("should render when no planet is selected", () => {
    const w = render(<SelectedPlanet />);
    expect(w.container).toMatchSnapshot();
  });
});
