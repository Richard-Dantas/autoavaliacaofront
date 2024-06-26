import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =  'http://localhost:8080/api';

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes:["Avaliations"],
    endpoints:(builder) => ({}),
    baseQuery: fetchBaseQuery({ baseUrl }),
});