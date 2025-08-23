import { RootApi } from "../../services/RootApi";

export const AuthApi = RootApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "/auth/register",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["user"]
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["user"]
        }),
        profile: builder.query({
            query: () => ({
                url: "/user/profile",
                method: "GET",
            }),
            providesTags: ["user"]
        }),
        wallet: builder.query({
            query: () => ({
                url: "/wallet",
                method: "GET",
            }),
            providesTags: ["wallet"]
        }),
        getMytransactions: builder.query({
            query: () => ({
                url: "/transactions/me",
                method: "GET",
            }),
            providesTags: ["transactions"]
        }),
        sendMoney: builder.mutation({
            query: (data) => ({
                url: "/wallet/send-money",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["wallet"]
        }),
        withdraw: builder.mutation({
            query: (data) => ({
                url: "/wallet/withdraw",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["wallet"]
        })

    }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery,useWithdrawMutation, useGetMytransactionsQuery, useWalletQuery, useSendMoneyMutation } = AuthApi;