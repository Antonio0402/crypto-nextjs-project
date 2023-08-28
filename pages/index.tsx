import { Typography, Row, Col, Statistic } from "antd";
import Link from "next/link";
import millify from "millify";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import CryptocurrenciesPage from "./cryptocurrencies";
import News from "./news";

const { Title } = Typography;

const count = 10;

type Stats = {
  total: number;
  totalExchanges: number;
  totalMarketCap: number;
  total24hVolume: number;
  totalMarkets: number;
};

export default function Home({
  stats,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="max-sm:mt-5">
        <Title level={2}>Global Crypto Stats</Title>
      </div>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={stats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(stats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={`${millify(stats.totalMarketCap)}`}
            prefix="$"
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`${millify(stats.total24hVolume)}`}
            prefix="$"
          />
        </Col>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={stats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Markets"
            value={millify(stats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="flex justify-between items-center mt-10 gap-4">
        <Title level={2} className="max-md:!text-2xl !mb-0">
          Top 10 Cryptos In The World
        </Title>
        <Title level={3} className="max-md:!text-xl">
          <Link href="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <CryptocurrenciesPage simplified />
      <div className="flex justify-between items-center mt-10 gap-4">
        <Title level={2} className="max-md:!text-2xl !mb-0">
          Latest Crypto News
        </Title>
        <Title level={3} className="max-md:!text-xl">
          <Link href="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}

export const getStaticProps: GetStaticProps<{ stats: Stats }> = async () => {
  const res = await fetch(
    `${process.env.CRYPTO_API_URL}/coins?limit=${count}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": process.env.CRYPTO_RAPIDAPI_HOST,
      } as HeadersInit | undefined,
    }
  );
  const data = await res.json();
  const globalStats = data?.data?.stats;

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      stats: globalStats,
    },
  };
};
