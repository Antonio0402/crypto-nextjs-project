import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Col, Divider, Row, Select, Space, Typography } from "antd";
import millify from "millify";
import { ComponentProps, useMemo, useState } from "react";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";

type Coin = {
  uuid: string;
  name: string;
  symbol: string;
  price: string;
  rank: number;
  volume?: string;
  marketCap?: string;
  allTimeHigh?: {
    price: string;
  };
  description: string;
  links: {
    name: string;
    type: string;
    url: string;
  }[];
  numberOfMarkets: number;
  numberOfExchanges: number;
  supply?: {
    confirmed: boolean;
    supplyAt: number;
    max: string;
    total: string;
    circulating: string;
  };
};

const { Title, Paragraph, Text } = Typography;

const Crypto = ({ cryptoDetails }: { cryptoDetails: Coin }) => {
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];
  const [timeperiod, setTimeperiod] = useState("7d");
  const stats = useMemo(
    () => [
      {
        title: "Price to USD",
        value: `$ ${
          cryptoDetails?.price && millify(Number(cryptoDetails?.price))
        }`,
        icon: <DollarCircleOutlined />,
      },
      { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
      {
        title: "24h Volume",
        value: `$ ${
          cryptoDetails?.volume && millify(Number(cryptoDetails?.volume))
        }`,
        icon: <ThunderboltOutlined />,
      },
      {
        title: "Market) Cap",
        value: `$ ${
          cryptoDetails?.marketCap && millify(Number(cryptoDetails?.marketCap))
        }`,
        icon: <DollarCircleOutlined />,
      },
      {
        title: "All-time-high(daily avg.)",
        value: `$ ${
          cryptoDetails?.allTimeHigh?.price &&
          millify(Number(cryptoDetails?.allTimeHigh?.price))
        }`,
        icon: <TrophyOutlined />,
      },
    ],
    [cryptoDetails]
  );

  const genericStats = useMemo(
    () => [
      {
        title: "Number Of Markets",
        value: cryptoDetails?.numberOfMarkets,
        icon: <FundOutlined />,
      },
      {
        title: "Number Of Exchanges",
        value: cryptoDetails?.numberOfExchanges,
        icon: <MoneyCollectOutlined />,
      },
      {
        title: "Aprroved Supply",
        value: cryptoDetails?.supply?.confirmed ? (
          <CheckOutlined />
        ) : (
          <StopOutlined />
        ),
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Total Supply",
        value: `$ ${
          cryptoDetails?.supply?.total &&
          millify(Number(cryptoDetails?.supply?.total))
        }`,
        icon: <ExclamationCircleOutlined />,
      },
      {
        title: "Circulating Supply",
        value: `$ ${
          cryptoDetails?.supply?.circulating &&
          millify(Number(cryptoDetails?.supply?.circulating))
        }`,
        icon: <ExclamationCircleOutlined />,
      },
    ],
    [cryptoDetails]
  );

  return (
    <div className="m-8">
      <div className="grid place-items-center py-5 gap-2.5">
        <Title level={2} className="!font-black !text-[#0071bd]">
          {cryptoDetails.name} {cryptoDetails.symbol} Price
        </Title>
        <Paragraph className="text-base text-opacity-90">
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </Paragraph>
      </div>
      <Divider className="sm:my-5" />
      <Select
        defaultValue="7d"
        className="!w-52"
        placeholder="Select Timeperiod"
        optionLabelProp="label"
        options={time.map((date) => ({
          value: date,
          label: date,
        }))}
        onChange={(value) => setTimeperiod(value)}
      />
      <LineChart
        coinId={cryptoDetails.uuid}
        timeperiod={timeperiod}
        currentPrice={millify(Number(cryptoDetails?.price))}
        coinName={cryptoDetails?.name}
      />
      <Space align="center" size={40}>
        <Col>
          <Col>
            <Title className="!font-bold !text-2xl !text-[#0071bd]" level={3}>
              {cryptoDetails.name} Value Statistics
            </Title>
            <Paragraph className="font-base text-opacity-90">
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </Paragraph>
          </Col>
          {stats.map(({ icon, title, value }, idx) => (
            <Col
              className="flex justify-between text-base p-5 hover:bg-neutral-50 border-b gap-2"
              key={idx}
            >
              <div className="flex gap-2.5 text-base">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </div>
              <Text className="font-extrabold">{value}</Text>
            </Col>
          ))}
        </Col>
        <Col>
          <Col>
            <Title className="!font-bold !text-2xl !text-[#0071bd]" level={3}>
              Other Stats Info
            </Title>
            <Paragraph className="font-base text-opacity-90">
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </Paragraph>
          </Col>
          {genericStats.map(({ icon, title, value }, idx) => (
            <Col
              className="flex justify-between text-base p-5 hover:bg-neutral-50 border-b gap-2"
              key={idx}
            >
              <div className="flex gap-2.5 text-base">
                <Text>{icon}</Text>
                <Text>{title}</Text>
              </div>
              <Text className="font-extrabold">{value}</Text>
            </Col>
          ))}
        </Col>
      </Space>
      <Row gutter={40} className="mt-10 pt-5">
        <Col flex={1} className="">
          <Title level={3} className="!font-bold !text-2xl !text-[#0071bd]">
            What is {cryptoDetails.name}?
          </Title>
          <Paragraph className="font-base text-opacity-90">
            {cryptoDetails.description}
          </Paragraph>
          {/* {HTMLReactParser(cryptoDetails.description)} */}
        </Col>
        <Col flex={1} className="sm:px-5">
          <Title level={3} className="!font-bold !text-2xl !text-[#0071bd]">
            {cryptoDetails.name} Links
          </Title>
          {cryptoDetails.links.map((link) => (
            <Row
              className="flex justify-between items-center border-b p-5 hover:bg-neutral-50"
              key={link.name}
            >
              <Title level={5} className="!capitalize !text-base">
                {link.type}
              </Title>
              <a
                className="text-[#0071bd] font-bold text-base"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                {link.name}
              </a>
            </Row>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default Crypto;
