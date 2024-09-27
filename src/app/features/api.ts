import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "/api", timeout: 60000 * 5 });

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: () => ({}),
});
