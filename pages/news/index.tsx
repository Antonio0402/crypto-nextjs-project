import { useGetCryptosQuery } from "@/src/api/cryptoApi";
import { CrytosCoin } from "@/src/hooks/useFilteredData";
import { useCryptoNews } from "@/src/hooks/useCrytoNews";
import { Col, Row, Select } from "antd";
import { useState } from "react";

const NewsPage = ({ simplified }: { simplified: boolean | undefined }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { content } = useCryptoNews({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  return (
    <Row gutter={[24, 24]} className="my-5">
      {!simplified && (
        <Col span={24}>
          <Select
            defaultValue="Cryptocurrency"
            placeholder="Select a Crypto"
            optionFilterProp="label"
            options={data?.data.coins?.map((currency: CrytosCoin) => ({
              value: currency.name,
              label: currency.name,
            }))}
            onChange={(value) => setNewsCategory(value)}
            filterOption={(inputValue, option) =>
              option?.values.toLowerCase().indexOf(inputValue.toLowerCase()) >=
              0
            }
            className=""
          >
            {/* <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>
            {data?.data.coins?.map((currency: CrytosCoin) => (
              <Select.Option key={currency.uuid} value={currency.name}>
                {currency.name}
              </Select.Option>
            ))} */}
          </Select>
        </Col>
      )}
      {content}
    </Row>
  );
};

export default NewsPage;
