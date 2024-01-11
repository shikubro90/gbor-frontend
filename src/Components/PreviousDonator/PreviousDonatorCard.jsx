import React from "react";
import "./PreviousDonar.css";

const PreviousDonatorCard = ({ data }) => {
  const { donarName, gborAmount, message, isMessageVisible } = data;
  return (
    <div className="bg-gradient-to-r from-[#f07360] to-[#ec5961] p-5 rounded-md shadow hover:shadow-lg">
      <h1 className="font-bold text-lg">{donarName}</h1>
      <h2 className="font-bold mt-2 mb-1">GBOR GIVEN: {gborAmount}</h2>
      <p className="text">{isMessageVisible && message}</p>
    </div>
  );
};

export default PreviousDonatorCard;
