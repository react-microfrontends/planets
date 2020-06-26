import { fetchWithCache } from "@react-mf/api";
import { combineLatest } from "rxjs";

export function getPlanets(pageNum = 1) {
  return fetchWithCache(`planets?page=${pageNum}`);
}

export function getPlanet(id) {
  return fetchWithCache(`planets/${id}/`);
}

export function getPerson(peronNumber) {
  return fetchWithCache(`people/${peronNumber}/`);
}

export function getPeopleByIds(people = []) {
  const peopleObsArray = people.map((person) => {
    return fetchWithCache(`people/${person}/`);
  });
  return combineLatest(peopleObsArray);
}
