import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../axiosBaseQuery";

export const RootApi = createApi({
  reducerPath: "RootApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["user", "wallet", "transactions"],
  endpoints: () => ({}),
});
