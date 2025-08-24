import { RootApi } from "../../services/RootApi";

export const AdminApi = RootApi.injectEndpoints({
  endpoints: (builder) => ({
    // Admin profile
    profile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    // Users
    getAllUser: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    userBlock: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),

    // Agents
    getAllAgents: builder.query({
      query: () => ({
        url: "/admin/agents",
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateAgentStatus: builder.mutation({
      query: (agentId) => {
        return {
          url: `/admin/agents/${agentId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["user"],
    }),



    // Wallets
    getAllWallets: builder.query({
      query: () => ({
        url: "/admin/wallets",
        method: "GET",
      }),
      providesTags: ["wallet"],
    }),
    toggleWalletBlock: builder.mutation({
      query: (walletId: string) => ({
        url: `/admin/wallets/${walletId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["wallet"],
    }),

    // Transactions
    getAllTransactions: builder.query({
      query: () => ({
        url: "/admin/transactions",
        method: "GET",
      }),
      providesTags: ["transactions"],
    }),
  }),
});

export const {
  useProfileQuery,
  useGetAllUserQuery,
  useGetAllAgentsQuery,
  useUpdateAgentStatusMutation,
  useGetAllWalletsQuery,
  useToggleWalletBlockMutation,
  useGetAllTransactionsQuery,
  useUserBlockMutation
} = AdminApi;
