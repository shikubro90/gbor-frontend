import React, { useEffect, useState } from "react";
import axios from "../../../Config";
import PreviousDonatorCard from "./PreviousDonatorCard";

const PreviousDonator = ({ id }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/payment/${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1 className=" w-3/4 mx-auto text-center text-5xl font-bold pb-4 mt-24">
        Liste des donateurs
      </h1>
      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 w-full  lg:w-3/4 mx-auto gap-4 mt-10 p-4 lg:p-0">
        {data.map((creator) => (
          <PreviousDonatorCard key={creator.id} data={creator} />
        ))}
      </div>
    </div>
  );
};

export default PreviousDonator;
