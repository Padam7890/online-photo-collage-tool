import { FormValues } from "@/components/ImageUpload";
import { collageMakerRequest, collageMakerResponse } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collageMaker = createApi({
  reducerPath: "collageMaker",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    createCollage: builder.mutation<collageMakerResponse,FormData>({
      query: (formData) => ({
        url: "/collage-maker",
        method: "POST",
        body:formData
      }),
    }),
  }),
});

export const { useCreateCollageMutation } = collageMaker;