import { useGetCryptoDetailsQuery } from "../api/cryptoApi";
import Crypto from "../components/Crypto";
import Loader from "../components/Loader";
import Error from "../components/Error";

export const useCryptoDetails = (coinId: string) => {
  const { data, isLoading, isSuccess, isError } = useGetCryptoDetailsQuery(
    coinId || ""
  );
  let content;
  if (isLoading) {
    content = <Loader />;
  } else if (isSuccess) {
    content = <Crypto cryptoDetails={data?.data?.coin} />;
  } else if (isError) {
    content = (
      <Error type="push" url="/cryptocurrencise">
        Back to Home
      </Error>
    );
  }
  return { content };
};
