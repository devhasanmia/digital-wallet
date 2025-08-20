import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const RootApi = createApi({
  reducerPath: "RootApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: () => ({}),
});

export const {} = RootApi;
