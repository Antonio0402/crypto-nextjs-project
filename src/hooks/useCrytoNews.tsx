import { Avatar, Card, Col, Divider, Typography } from "antd";
import { useGetCryptosNewsQuery } from "../api/cryptoNewsApi";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useRouter } from "next/router";
import Image from "next/image";
import demoImage from "../../public/not-found.png";
import Loader from "../components/Loader";
import Error from "../components/Error";

export type CryptoNews = {
  url: string;
  name: string;
  image?: {
    thumbnail: {
      contentUrl: string;
    };
  };
  description: string;
  provider: {
    name: string;
    image?: {
      thumbnail: {
        contentUrl: string;
      };
    };
  }[];
  datePublished: string;
};
export const useCryptoNews = ({
  newsCategory,
  count,
}: {
  newsCategory: string;
  count: number;
}) => {
  const {
    data: cryptoNews,
    isLoading,
    isSuccess,
    isError,
  } = useGetCryptosNewsQuery({ newsCategory, count });
  const router = useRouter();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = cryptoNews?.value.map((news: CryptoNews, index: number) => (
      <Col xs={24} sm={12} lg={6} className="min-w-[248px]" key={index}>
        <a href={news.url} target="_blank" rel="noreferrer">
          <Card
            // title={news.name}
            // extra={
            //   <img
            //     className="w-9"
            //     src={news.image?.thumbnail?.contentUrl || demoImage}
            //   />
            // }
            className="min-h-[280px] [&>p]:my-2.5"
            hoverable
          >
            <div className="flex justify-between">
              <Typography.Title level={4} className="basis-2/3">
                {news.name}
              </Typography.Title>
              <div>
                <Image
                  src={news.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <Divider />
            <Typography.Paragraph
              ellipsis={{
                rows: 4,
                expandable: false,
                suffix: `--${news.provider[0].name}`,
              }}
            >
              {news.description}
            </Typography.Paragraph>
            <div className="flex justify-between">
              <Avatar
                src={
                  news.provider[0].image?.thumbnail?.contentUrl ||
                  news.provider[0].name
                }
                size="large"
                gap={8}
              />
              <Typography.Text>{news.provider[0].name}</Typography.Text>
            </div>
            <Typography.Text>{`${formatDistanceToNow(
              parseISO(news.datePublished),
              { includeSeconds: true }
            )} ago`}</Typography.Text>
          </Card>
        </a>
      </Col>
    ));
  } else if (isError) {
    content = (
      <Error type="reload" url="">
        Try Again
      </Error>
    );
  }

  return { content };
};
