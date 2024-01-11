import { Avatar } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BsFillSendFill, BsSend } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { socketIO } from "../../../../../../Socket";

const MessageCreatorPage = () => {
  const { id, name } = useParams();
  const [fieldData, setFieldData] = useState("");
  const { userInfo } = JSON.parse(localStorage.yourInfo);
  const [chat, setChat] = useState([]);
  const lastMessageRef = useRef();
  const navigate = useNavigate();
  const [write, setWrite] = useState(false);
  const [load, setLoad] = useState(1);

  let socket = socketIO;

  const data = {
    uid: id,
  };

  useEffect(() => {
    socket.emit("join-chat", data);
    socket.on("all-messages", (data) => {
      setChat(data);
    });
  }, []);

  socket.on("multiple-message-hitted", (data) => {
    socket.emit("show-all-messages", { uid: id });
  });

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleMessage(e);
    }
  };

  const handleMessage = (e) => {
    e.preventDefault();
    if (fieldData !== "") {
      const data = {
        message: fieldData,
        chat: id,
        sender: userInfo._id,
      };
      socket.emit("add-new-message", data);
      setFieldData("");
      setWrite(false);
    }
  };

  const handleBack = () => {
    socket.emit("leave-room", data);
    navigate("/dashboard/message");
  };

  function getTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "Just now";
    }
  }

  //infinite scroll
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollTop = lastMessageRef.current.scrollHeight;
    }
  });

  return (
    <>
      <button
        type="text"
        onClick={handleBack}
        className="my-4 text-xl flex items-center "
        style={{ color: "black" }}
      >
        <IoIosArrowBack style={{ fontSize: "20px" }} /> <span>{name}</span>
      </button>
      <div className="border border-[#fb7c29] w-full rounded-md  bg-orange-50 ">
        <div
          className="w-full h-[570px] overflow-y-auto flex flex-col scrollbar rounded p-1 px-5"
          ref={lastMessageRef}
        >
          {chat.map((chatData, index) => {
            return chatData?.sender?._id === userInfo._id ? (
              <div className="mb-4" key={index}>
                <div
                  className="flex gap-2"
                  style={{ justifyContent: "flex-end" }}
                >
                  <p className="bg-orange-500 w-1/2 rounded-l-xl rounded-br-xl p-4 text-white relative">
                    {chatData.message}
                  </p>
                  <Avatar
                    size={40}
                    src={chatData.sender?.uploadId}
                    style={{ borderRadius: "50%" }}
                  />
                </div>
                <p className="text-gray-400  text-right mr-12 mt-1">
                  {getTimeAgo(chatData.createdAt)}
                </p>
              </div>
            ) : (
              <div className="mb-4" key={index}>
                <div className="flex gap-2">
                  <Avatar
                    size={40}
                    src={chatData.sender?.uploadId}
                    style={{ borderRadius: "50%" }}
                  />
                  <p className="border-2 border-orange-500 w-1/2 rounded-r-xl rounded-bl-xl p-4  relative">
                    {chatData.message}
                  </p>
                </div>
                <p className="text-gray-400 ml-12 mt-1">
                  {" "}
                  {getTimeAgo(chatData.createdAt)}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2 p-1 bg-orange-100 rounded">
          <input
            type="text"
            value={fieldData}
            onChange={(e) => setFieldData(e.target.value)}
            onKeyUp={handleKeyUp}
            onKeyDown={() => setWrite(true)}
            name="message"
            placeholder="Type message..."
            className="w-full h-12 border border-orange-300 rounded px-3 outline-none text-lg text-orange-500 placeholder:text-orange-200"
          />
          <button className="px-2" onClick={handleMessage}>
            {write ? (
              <BsFillSendFill fontSize={30} color="#fb7c29" />
            ) : (
              <BsSend fontSize={30} color="#fb7c29" />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default MessageCreatorPage;
