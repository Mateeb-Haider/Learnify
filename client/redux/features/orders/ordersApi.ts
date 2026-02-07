import { apiSlice } from "../api/apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: `get-orders`,
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getStripePublishAbleKey: builder.query({
            query:()=>({
                url:`payment/stripepublishablekey`,
                method:"GET",
                credentials: "include" as const,
            })
        }),
        createPaymetIntent: builder.mutation({
            query:(amount:number)=>({
                url:`payment/new`,
                method:"POST",
                credentials: "include" as const,
                body:{amount}
            })
        }),
        createOrder: builder.mutation({
            query:({courseId, payment_info})=>({
                url:`create-order`,
                method:"POST",
                credentials: "include" as const,
                body:{courseId, payment_info}
            })
        })

    })
})
export const { useGetAllOrdersQuery, useGetStripePublishAbleKeyQuery, useCreatePaymetIntentMutation, useCreateOrderMutation } = ordersApi;