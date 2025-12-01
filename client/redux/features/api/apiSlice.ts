import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";
export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,

    }),
    endpoints: (builder) => ({
        // refreshToken
        refreshToken: builder.query({
            query: (data) => ({
                url: "refresh",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        loadUser: builder.query({
            query: (data) => ({
                url: "me",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            accessToken: (await result).data.accessToken,
                            user: (await result).data.user,
                        })
                    )
                } catch (error: any) {
                    console.log(error)
                }
            }
        })
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;