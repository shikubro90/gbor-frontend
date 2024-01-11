import { CloseOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Row, Space, Table, Typography } from "antd";
import React, { useState } from "react";
import { BsPrinter } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { HiUserGroup } from "react-icons/hi";
import { RxDownload } from "react-icons/rx";
const { Title, Text } = Typography;

const EarnMonthlyTable = ({ incomes }) => {
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const pageSize = 5;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [earningData, setEarningData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setEarningData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setEarningData(null);
  };

  const data = incomes.map((item) => {
    return {
      months: item.monthName,
      totalDonar: item.totalDonors,
      amount: item.amount,
      action: item,
    };
  });

  const columns = [
    {
      title: "MONTHS",
      dataIndex: "months",
      key: "months",
    },
    {
      title: "TOTAL DONAR",
      dataIndex: "totalDonar",
      key: "totalDonar",
    },

    {
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: (
        <div className="text-right">
          <p>ACTION</p>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "right" }}>
          <Button
            onClick={() => showDrawer(record)}
            type="text"
            style={{ marginRight: "10px" }}
          >
            <BsPrinter style={{ fontSize: "20px", color: "#595959" }} />
          </Button>
          <Button onClick={() => showDrawer(record)} type="text">
            <RxDownload style={{ fontSize: "20px", color: "#595959" }} />
          </Button>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
      <Drawer
        title={
          <div>
            <Typography>
              <Title level={4} style={{ color: "white" }} strong>
                Monthly Income# {earningData?.months}
              </Title>
              <Text style={{ color: "white" }}>
                See total income in {earningData?.months}
              </Text>
            </Typography>
          </div>
        }
        headerStyle={{ background: "#fb7c29", color: "#fff" }}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
        closable={false}
        extra={
          <Space>
            <Button
              style={{
                height: "40px",
                width: "40px",
                borderRadius: "100%",
                backgroundColor: "#f5f5f5",
                color: "#fb7c29",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={closeDrawer}
            >
              <CloseOutlined />
            </Button>
          </Space>
        }
      >
        <Row>
          <Col span={12}>
            <p className="text-lg font-medium">Total Donar</p>
            <p className="text-lg font-medium">Payment Amount</p>
          </Col>
          <Col span={12} className="text-right">
            <p className="text-lg font-medium gap-1 flex items-center justify-end text-gray-500">
              <span>{earningData?.totalDonar}</span>{" "}
              <HiUserGroup fontSize={20} color="#fb7c29" />
            </p>
            <p className="text-lg font-medium gap-1 flex items-center justify-end text-gray-500">
              <span>{earningData?.amount}</span>{" "}
              <svg
                className="w-[28px] mt-[1px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 64 64"
                id="france"
              >
                <ellipse
                  cx="32"
                  cy="32"
                  fill="transparent"
                  stroke="transparent"
                  stroke-miterlimit="10"
                  stroke-width="4"
                  rx="29.71"
                  ry="29"
                ></ellipse>
                <path
                  fill="transparent"
                  stroke="#fb7c29"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="4"
                  d="M27.44,47.1V18.93a2.06,2.06,0,0,1,2.08-2H43.18"
                ></path>
                <line
                  x1="27.44"
                  x2="39.4"
                  y1="29.67"
                  y2="29.67"
                  fill="transparent"
                  stroke="#fb7c29"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="4"
                ></line>
                <line
                  x1="20.82"
                  x2="34.47"
                  y1="37.14"
                  y2="37.14"
                  fill="transition"
                  stroke="#fb7c29"
                  stroke-linecap="round"
                  stroke-miterlimit="10"
                  stroke-width="4"
                ></line>
              </svg>
            </p>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};
export default EarnMonthlyTable;
