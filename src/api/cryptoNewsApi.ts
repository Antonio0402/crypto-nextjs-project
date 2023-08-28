import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cryptoNewsApiHeaders = {
		'X-BingApis-SDK': 'true',
		'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
		'X-RapidAPI-Host': process.env.NEXT_PUBLIC_NEWS_RAPIDAPI_HOST
};

const createRequest = (url: string) => ({ url, headers: cryptoNewsApiHeaders});


export const cryptoNewsApi = createApi({
  reducerPath: "cryptoNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_NEWS_API_URL }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: ({ newsCategory, count }: { newsCategory: string, count: number}) => createRequest(`/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`)
    })
  })
})

export const {
  useGetCryptosNewsQuery
} = cryptoNewsApi