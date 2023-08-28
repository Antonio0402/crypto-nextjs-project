import { useGetExchangesQuery } from "@/src/api/cryptoApi";
import Error from "@/src/components/Error";
import Loader from "@/src/components/Loader";
import { Avatar, Col, Collapse, Row, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React from "react";

const { Panel } = Collapse;

type Exchange = {
  uuid: string;
  rank: number;
  iconUrl: string;
  name: string;
  volume: string;
  marketShare: string;
  numberOfMarkets: number;
  description: string;
};

const ExchangesPage = () => {
  const { data, isLoading, isSuccess, isError } = useGetExchangesQuery("");

  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = data?.data?.exhanges.map((exchange: Exchange) => (
      <Col span={4} key={exchange.uuid}>
        <Collapse>
          <Panel
            key={exchange.uuid}
            showArrow={false}
            header={
              <Row>
                <Col span={6}>
                  <Typography.Text strong>{exchange.rank}</Typography.Text>
                  <Avatar className="!mx-2.5" src={exchange.iconUrl} />
                  <Typography.Text strong>{exchange.name}</Typography.Text>
                </Col>
                <Col span={6}>${millify(Number(exchange.volume))}</Col>
                <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                <Col span={6}>{millify(Number(exchange.marketShare))}%</Col>
              </Row>
            }
            className="mb-6"
          >
            {HTMLReactParser(exchange.description || "")}
          </Panel>
        </Collapse>
      </Col>
    ));
  } else if (isError) {
    content = (
      <Error type="push" url="/">
        Back to Home
      </Error>
    );
  }

  return (
    <div className="my-5">
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>{content}</Row>
    </div>
  );
};

export default ExchangesPage;
