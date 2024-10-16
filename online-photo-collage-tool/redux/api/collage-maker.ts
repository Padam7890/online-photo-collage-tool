import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const collageMaker = createApi({
    reducerPath: "collageMaker",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.example.com/collage-maker",
    }),
    endpoints: (builder) => ({
        createCollage:builder.mutation({
            query: () => ({
                url: "/create",
                method: "POST",
            }),
        })
    }),

})