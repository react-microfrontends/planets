import React, { useEffect, useState } from "react";

export default function PlanetAttribute({ title, value, children }) {
  return (
    <div className="flex">
      <div className="pr-6 w-40 font-bold">{title}</div>
      {value ? <div>{value}</div> : <div>{children}</div>}
    </div>
  );
}
