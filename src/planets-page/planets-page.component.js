import React, { useReducer, useEffect } from "react";
import PlanetList from "../planet-list/planet-list.component.js";
import SelectedPlanet from "./selected-planet/selected-planet.component.js";
import { get } from "lodash";
import { getPlanets } from "../utils/api.js";
import { Button } from "@react-mf/styleguide";

export default function PlanetPage(props) {
  const initialState = {
    planets: [],
    loading: false,
    page: 0,
    nextPage: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "fetchPlanets" });
  }, []);
  const { page, nextPage, loading } = state;
  const { pathname } = props.location;
  const regexSearch = /[0-9]+/.exec(pathname);
  const selected = get(regexSearch, "[0]");

  useEffect(() => {
    if (page > 0) {
      const req$ = getPlanets(page).subscribe((results) => {
        dispatch({
          type: "addPlanets",
          payload: {
            nextPage: !!results.next,
            results: results.results,
          },
        });
      });
    }
  }, [page]);

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          {nextPage ? (
            <Button
              disabled={loading || !nextPage}
              loading={loading}
              onClick={() => {
                dispatch({ type: "fetchPlanets" });
              }}
            >
              Fetch More Planets
            </Button>
          ) : null}
          <PlanetList {...state} />
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          <div className="selectedPlanet">
            <SelectedPlanet selectedId={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}

function reducer(state, action) {
  const newState = { ...state };
  switch (action.type) {
    case "addPlanets":
      const { payload } = action;
      newState.loading = false;
      newState.nextPage = payload.nextPage;
      newState.planets = [...newState.planets, ...payload.results];
      return newState;
    case "fetchPlanets":
      newState.loading = true;
      newState.page = newState.page + 1;
      return newState;
    default:
      return state;
  }
}
