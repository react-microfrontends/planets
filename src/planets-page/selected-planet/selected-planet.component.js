import React, { useEffect, useState } from "react";
import { useCss } from "kremling";
import NotablePeople from "./notable-people/notable-people.component.js";
import css from "./selected-planet.krem.css";
import { getPlanet } from "../../utils/api.js";

export default function SelectedPlanet(props) {
  const { selectedId } = props;
  const [selectedPlanet, setPlanet] = useState();
  const scope = useCss(css);

  useEffect(() => {
    if (selectedId) {
      const sub = getPlanet(selectedId).subscribe(planet => {
        setPlanet(planet);
      });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [selectedId]);

  if (!selectedPlanet) {
    return <div>No planet Selected</div>;
  }

  return (
    <div {...scope}>
      <div className="planetAttribute">
        <div className="attributeTitle">Climate</div>
        <div className="attribute">{selectedPlanet.climate}</div>
      </div>
      <div className="planetAttribute">
        <div className="attributeTitle">Diameter</div>
        <div className="attribute">
          {formatDiameter(selectedPlanet.diameter)}
        </div>
      </div>
      <div className="planetAttribute">
        <div className="attributeTitle">Gravity</div>
        <div className="attribute">{selectedPlanet.gravity}</div>
      </div>
      <div className="planetAttribute">
        <div className="attributeTitle">Terrain</div>
        <div className="attribute">{selectedPlanet.terrain}</div>
      </div>
      <div className="planetAttribute">
        <div className="attributeTitle">Population</div>
        <div className="attribute">
          {formatPopulation(selectedPlanet.population)}
        </div>
      </div>
      <NotablePeople people={selectedPlanet.residents} />
    </div>
  );
}

function formatDiameter(value) {
  if (value === undefined) {
    return "";
  } else {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      return value;
    } else {
      return `${value} Kilometers (${value * 0.621371} Miles)`;
    }
  }
}
function formatPopulation(value) {
  if (value === undefined) {
    return "";
  } else {
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      return value;
    } else {
      return abbrNum(value);
    }
  }
}

// copied from stack overflow
export function abbrNum(number, decPlaces = 2) {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  const abbrev = ["k", "m", "b", "t"];
  let newNumber = number;

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= newNumber) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      newNumber = Math.round((number * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (newNumber == 1000 && i < abbrev.length - 1) {
        newNumber = 1;
        i++;
      }

      // Add the letter for the abbreviation
      newNumber += abbrev[i];

      // We are done... stop
      break;
    }
  }
  return newNumber;
}
