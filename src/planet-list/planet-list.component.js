import React, { Fragment } from "react";
import { getPlanets } from "../utils/api.js";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

function PlanetList(props) {
  const { loading, planets, nextPage, match } = props;

  return (
    <div className="planetList">
      {planets.map((planet, i) => {
        let borderClass = "border-b";
        if (i === 0) {
          borderClass = "border-t border-b";
        } else if (i + 1 === planets.length) {
          borderClass = "";
        }
        return (
          <Link
            key={planet.id}
            className={`h-12 flex items-center ${borderClass} border-white cursor-pointer no-underline`}
            to={`${match.path}/${planet.id}`}
          >
            {planet.name}
          </Link>
        );
      })}
      {loading && <div>Loading ...</div>}
    </div>
  );
}

export default withRouter(PlanetList);
