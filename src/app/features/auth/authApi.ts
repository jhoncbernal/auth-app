import { api } from "@/features/api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateUser: build.mutation({
      query: (data) => ({
        url: "/auth/user",
        method: "PUT",
        body: data,
      }),
    }),
    sendVerification: build.mutation({
      query: (data) => ({
        url: "/auth/email/verify",
        method: "POST",
        body: data,
      }),
    }),
    sendRecover: build.mutation({
      query: (data) => ({
        url: "/auth/email/recover",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useSendVerificationMutation,
  useSendRecoverMutation,
} = authApi;
