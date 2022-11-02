import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeoLocation } from "common/interfaces";

export const geoLocationAPI = createApi({
  reducerPath: "geoLocation",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.ipgeolocation.io",
  }),
  endpoints: (builder) => ({
    getGeoLocation: builder.query<GeoLocation, void>({
      query: () => `/ipgeo?apiKey=${String(import.meta.env.VITE_GEO_API_KEY)}`,
    }),
  }),
});

export const { useGetGeoLocationQuery } = geoLocationAPI;
