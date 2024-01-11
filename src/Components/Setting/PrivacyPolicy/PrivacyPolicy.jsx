import { Button, Col, Row, notification } from "antd";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import axios from "../../../../Config";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const token = localStorage.token;

  const successNotify = (placement) => {
    api.success({
      message: "Updated",
      description: "Successfully updated privacy policy content",
      placement,
    });
  };
  const errorNotify = (placement) => {
    api.success({
      message: "Opps!",
      description: "Not updated privacy policy content",
      placement,
    });
  };

  useEffect(() => {
    axios
      .get("api/privacy-policy", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContent(res.data?.data["privacy and policy"]?.policy);
      });
  }, []);

  const handlePrivacyPolicy = () => {
    const values = {
      policy: content,
    };
    axios
      .post("api/privacy-policy", values, {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          successNotify("bottomRight");
        }
      })
      .catch((err) => errorNotify("bottomRight"));
  };
  return (
    <div>
      {contextHolder}
      <Row>
        <Col lg={{ span: 24 }}>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />

          <Button
            className=" bg-[#FB7C29]  hover:bg-red-500 duration-200"
            onClick={handlePrivacyPolicy}
            block
            style={{
              marginTop: "30px",
              color: "#fff",
              height: "45px",
              border: "none",
            }}
          >
            Save
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PrivacyPolicy;
