import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "@/src/api/cryptoApi";
import { Card, Col } from "antd";
import millify from "millify";
import Link from "next/link";
import Image from "next/image";
import Loader from "../components/Loader";
import Error from "../components/Error";

export type CrytosCoin = {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  price: string;
  marketCap: string;
  change: string;
};

export const useFilteredData = (count: number) => {
  const {
    data: cryptoList,
    isLoading,
    isSuccess,
    isError,
  } = useGetCryptosQuery(count);
  const [crytos, setCryptos] = useState<CrytosCoin[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = crytos?.map((currency) => (
      <Col xs={24} sm={12} lg={6} className="min-w-64" key={currency.uuid}>
        <Link href={`/crypto/${currency.uuid}`}>
          <Card
            title={`${currency.rank}. ${currency.name}`}
            extra={
              <Image
                className="w-9"
                src={currency.iconUrl}
                alt={currency.name}
                width={32}
                height={32}
                // style={{ width: "auto", height: "auto" }}
              />
            }
            hoverable
          >
            <p>Price: {millify(Number(currency.price))}</p>
            <p>Market Cap: {millify(Number(currency.marketCap))}</p>
            <p>Daily Change: {currency.change}%</p>
          </Card>
        </Link>
      </Col>
    ));
  } else if (isError) {
    content = (
      <Error type="reload" url="">
        Try Again
      </Error>
    );
  }

  useEffect(() => {
    if (isSuccess) {
      setCryptos(cryptoList?.data.coins);
    }
    const filteredData = cryptoList?.data.coins.filter((item: CrytosCoin) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setCryptos(filteredData);
  }, [isSuccess, cryptoList, searchTerm]);

  return { content, setSearchTerm };
};
