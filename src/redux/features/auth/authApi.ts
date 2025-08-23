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
        sendMoney: builder.mutation({
            query: (data) => ({
                url: "/wallet/send-money",
                method: "POST",
                data: data
            }),
            invalidatesTags: ["wallet"]
        })

    }),
});

export const { useRegisterMutation, useLoginMutation, useProfileQuery, useWalletQuery, useSendMoneyMutation } = AuthApi;