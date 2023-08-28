import { useCryptoDetails } from "@/src/hooks/useCryptoDetails";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

export type Coin = {
  name: string;
  symbol: string;
};

const CoinPage = () => {
  const router = useRouter();
  const coinId = router.query.coinId;

  const { content } = useCryptoDetails(coinId as string);

  return <>{content}</>;
};

export default CoinPage;

// export const getServerSideProps: GetServerSideProps<any> = async (context) => {
//   const { params } = context;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_CRYPTO_API_URL}/coin/${params?.coinId}`,
//     {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
//         "X-RapidAPI-Host": process.env.NEXT_PUBLIC_CRYPTO_RAPIDAPI_HOST,
//       } as HeadersInit | undefined,
//     }
//   );
//   const data = await res.json();
//   const coin = data?.data?.coin;
//   if (!data) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       stats: coin,
//     },
//   };
// };
