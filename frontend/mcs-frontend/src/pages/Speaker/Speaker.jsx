import React, { useState } from "react";
import { useEffect } from "react";
import { getSpeakers } from "../../api/axios";

function Speaker() {
  const [speakers, setSpeakers] = useState([]);

  useEffect(() => {
    getSpeakers()
      .then((data) => {
        setSpeakers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return <div>{JSON.stringify(speakers)}</div>;
}

export default Speaker;
