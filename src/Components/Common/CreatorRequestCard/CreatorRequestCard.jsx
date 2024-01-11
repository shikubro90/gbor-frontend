import { Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import axios from "../../../../Config";

const token = localStorage.token;

const CreatorRequestCard = ({ data, setReload }) => {
  const { _id, fName, lName, uploadId, email } = data;

  const handleCreatorApprove = (id) => {
    axios
      .post(
        `api/auth/approve-user/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire(
            "Approval successful",
            `${fName + " " + lName} request has been approved`,
            "success"
          );
          setReload((p) => p + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCreatorCancel = (id) => {
    axios
      .patch(
        `api/auth/cancel-user/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          Swal.fire(
            "Cancellation successful",
            `${fName + " " + lName} request has been canceled.`,
            "success"
          );
          setReload((p) => p + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Col
      xs={{
        span: 8,
      }}
      lg={{ span: 6 }}
    >
      <div className="border border-[#fb7c29] bg-orange-50 rounded-md text-center shadow-[0px 0px 4px 0px rgba(0, 0, 0, 0.20)] p-5">
        <img
          style={{ width: "120px", height: "120px", borderRadius: "100%" }}
          src={uploadId}
          className="block mx-auto "
          alt=""
        />
        <h2 className="text-xl text-[#FB7C29] mt-2">{fName + " " + lName}</h2>
        <p>{email}</p>
        <div className="space-x-2 mt-4">
          <button
            className="border border-[#FB7C29] text-[#FB7C29] px-6 py-2 rounded hover:bg-red-400 hover:text-white"
            onClick={() => handleCreatorCancel(_id)}
          >
            Cancel
          </button>
          <button
            className=" bg-[#FB7C29] text-white px-6 py-2 rounded hover:bg-green-400"
            onClick={() => handleCreatorApprove(_id)}
          >
            Approve
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CreatorRequestCard;
