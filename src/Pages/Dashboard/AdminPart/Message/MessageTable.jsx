import { Table } from "antd";
import React, { useState } from "react";
import { RiMessage2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { socketIO } from "../../../../../Socket";

const MessageTable = ({ handlePagination, handleSearch }) => {
  const { creatorsData, pagination } = useSelector((state) => state.creators);
  const navigate = useNavigate();
  const { userInfo } = JSON.parse(localStorage.yourInfo);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const data = creatorsData?.map((creator) => {
    return {
      profile: (
        <img
          style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          src={creator.uploadId}
        />
      ),
      username: creator.userName,
      creatorId: (
        <p className="text-gray-400">
          Creator ID: <span className="text-black">{creator._id}</span>
        </p>
      ),
      message: creator,
    };
  });

  const handleMessage = (e) => {
    let socket = socketIO;

    const name = e.message?.userName;

    const chatInfo = {
      participants: [e.message._id, userInfo._id],
    };

    const data = {
      chatInfo,
      uid: userInfo._id,
    };

    socket.emit("add-new-chat", data);
    socket.on("chat-id-check", (data) => {
      navigate(`/dashboard/message/${data._id}/${name}`);
    });
  };

  const columns = [
    {
      title: "PROFILE",
      dataIndex: "profile",
      key: "profile",
    },
    {
      title: "USER NAME",
      dataIndex: "username",
      key: "username",
      responsive: ["lg"],
    },
    {
      title: "CREATOR ID",
      dataIndex: "creatorId",
      key: "creatorId",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      responsive: ["lg"],
      render: (
        _,
        record // Use the second parameter 'record'
      ) => (
        <div className="text-right ">
          <button
            onClick={() => handleMessage(record)}
            type="text"
            className="bg-[#fb7c29] p-1 px-2 rounded"
          >
            <RiMessage2Line style={{ fontSize: "25px", color: "#fff" }} />
          </button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
    handlePagination(page);
    handleSearch(page);
  };

  return (
    <div>
      <Table
        showHeader={false}
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize,
          showSizeChanger: false,
          total: pagination?.totalDocuments,
          current: currentPage,
          onChange: handlePageChange,
        }}
      />
    </div>
  );
};

export default MessageTable;
