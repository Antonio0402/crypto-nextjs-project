import { useFilteredData } from "@/src/hooks/useFilteredData";
import { Input, Row } from "antd";

const { Search } = Input;

const CryptocurrenciesPage = ({
  simplified,
}: {
  simplified: boolean | undefined;
}) => {
  const count = simplified ? 10 : 100;
  const { content, setSearchTerm } = useFilteredData(count);
  return (
    <div className="my-5">
      {!simplified && (
        <div className="mb-8 mx-auto w-64">
          <Search
            placeholder="input search text"
            onSearch={(value: string) => setSearchTerm(value.toLowerCase())}
            className="[&_.anticon-search]:align-middle"
            enterButton
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="min-h-[65vh]">
        {content}
      </Row>
    </div>
  );
};

export default CryptocurrenciesPage;
