import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoApiHeaders = {
  "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
  "X-RapidAPI-Host": process.env.CRYPTO_RAPIDAPI_HOST,
};

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://coinranking1.p.rapidapi.com" }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count: number) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }: { coinId: string, timeperiod: string }) => createRequest(`/coin/${coinId}/history?timePeriod=${timeperiod}`)
    }),
    // Note: To access this endpoint need premium plan
    getExchanges: builder.query({
      query: () => createRequest("/exchanges")
    })
  })
})

export const {
  useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetExchangesQuery
} = cryptoApi;