import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { useGetCryptoHistoryQuery } from "../api/cryptoApi";
import Error from "./Error";
import Line from "./Line";
import Loader from "./Loader";

const { Title } = Typography;

type LineChartProps = {
  coinId: string;
  timeperiod: string;
  currentPrice: string;
  coinName: string;
};

const LineChart = ({
  coinId,
  timeperiod,
  currentPrice,
  coinName,
}: LineChartProps) => {
  const {
    data: coinHistory,
    isLoading,
    isSuccess,
    isError,
  } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div className="my-10">
        <Row className="flex justify-between gap-12 text-[#0071bd]">
          <Title className="!text-[#0071bd]" level={2}>
            {coinName} Price Chart
          </Title>
          <Col className="flex items-center gap-5 flex-wrap">
            <Title level={5} className="!font-black !mt-0">
              Change: {coinHistory?.data.change}%
            </Title>
            <Title level={5} className="!font-black !mt-0">
              Current: {coinName} Price: ${currentPrice}
            </Title>
          </Col>
        </Row>
        <Line coinHistory={coinHistory?.data} coinName={coinName} />
      </div>
    );
  } else if (isError) {
    content = (
      <Error type="reload" url="">
        Try Again
      </Error>
    );
  }

  return <>{content}</>;
};

export default LineChart;
