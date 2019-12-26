import React, { Fragment } from "react";
import { useCss } from "kremling";
import { getPlanets } from "../utils/api.js";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import css from "./planet-list.krem.css";

function PlanetList(props) {
  const { loading, planets, nextPage, match } = props;
  const scope = useCss(css);

  return (
    <div {...scope} className="planetList">
      {planets.map(planet => {
        return (
          <Link
            key={planet.id}
            className="planet"
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
