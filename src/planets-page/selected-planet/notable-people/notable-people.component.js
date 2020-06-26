import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPeopleByIds } from "../../../utils/api.js";
import PlanetAttribute from "../planet-attribute.component.js";

export default function NotablePeople(props) {
  const { people } = props;
  const [notablePeople, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (people && people.length > 0) {
      setLoading(true);
      const ids = people.map((person) =>
        person.replace("https://swapi.co/api/people/", "").replace("/", "")
      );
      const sub = getPeopleByIds(ids).subscribe((response) => {
        setLoading(false);
        setPeople(response);
      });
      return () => {
        setLoading(false);
        sub.unsubscribe();
      };
    } else {
      setLoading(false);
      setPeople([]);
    }
  }, [people]);

  return (
    <PlanetAttribute title={"Notable People"}>
      <PeopleList loading={loading} people={notablePeople} />
    </PlanetAttribute>
  );
}

function PeopleList(props) {
  const { people, loading } = props;
  if (loading) {
    return <div>Loading...</div>;
  } else if (people.length > 0) {
    return (
      <div>
        <ul className="residents">
          {people.map((person) => {
            return (
              <li key={person.id} className="resident">
                <Link className="text-info" to={`/people/${person.id}`}>
                  {person.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return <div>None found</div>;
  }
}
