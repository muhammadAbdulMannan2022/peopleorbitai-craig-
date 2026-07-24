import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    credentials: 'include', // Important: sends cookies with requests
  }),
  tagTypes: ['Profile', 'Assignment', 'Chat', 'Message', 'KnowledgeBase'],
  endpoints: (builder) => ({
    // Auth Endpoints
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Profile', 'Assignment', 'Chat', 'KnowledgeBase'],
    }),
    register: builder.mutation<any, any>({
      query: (user) => ({
        url: '/auth/register',
        method: 'POST',
        body: user,
      }),
    }),
    verifyOtp: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: payload,
      }),
    }),
    forgotPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<any, any>({
      query: (payload) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: payload,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Profile', 'Assignment', 'Chat', 'KnowledgeBase'],
    }),

    // Profile & Address Endpoints
    getProfile: builder.query<any, void>({
      query: () => '/users/profile',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<any, FormData | any>({
      query: (profileData) => ({
        url: '/users/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),
    addAddress: builder.mutation<any, any>({
      query: (address) => ({
        url: '/users/address',
        method: 'POST',
        body: address,
      }),
      invalidatesTags: ['Profile'],
    }),
    deleteAddress: builder.mutation<any, number>({
      query: (id) => ({
        url: `/users/address/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),

    // Assignments
    getAssignments: builder.query<any, void>({
      query: () => '/chats/assignments',
      providesTags: ['Assignment'],
    }),
    createAssignment: builder.mutation<any, any>({
      query: (assignment) => ({
        url: '/chats/assignments',
        method: 'POST',
        body: assignment,
      }),
      invalidatesTags: ['Assignment'],
    }),
    getAssignmentById: builder.query<any, string>({
      query: (id) => `/chats/assignments/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Assignment', id }],
    }),

    // Chats & Messages
    getChats: builder.query<any, void>({
      query: () => '/chats/conversations',
      providesTags: ['Chat'],
    }),
    createChat: builder.mutation<any, any>({
      query: (chat) => ({
        url: '/chats/conversations',
        method: 'POST',
        body: chat,
      }),
      invalidatesTags: (_result, _error, arg) => [
        'Chat',
        ...(arg.assignment_id ? [{ type: 'Assignment' as const, id: arg.assignment_id }] : []),
      ],
    }),
    getChatMessages: builder.query<any, string>({
      query: (chatId) => `/chats/conversations/${chatId}/messages`,
      providesTags: (_result, _error, chatId) => [{ type: 'Message', id: chatId }],
    }),
    sendMessage: builder.mutation<any, any>({
      query: (messagePayload) => ({
        url: '/chats/conversations/messages',
        method: 'POST',
        body: messagePayload,
      }),
      invalidatesTags: (_result, _error, arg) => [
        'Chat',
        ...(arg.assignment_id ? [{ type: 'Assignment' as const, id: arg.assignment_id }] : []),
      ],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          const chatId = response?.data?.chat_id || arg.chat_id;
          const userMessage = response?.data?.message;
          if (chatId && userMessage) {
            dispatch(
              apiSlice.util.updateQueryData('getChatMessages', chatId, (draft) => {
                if (!draft) {
                  return { success: true, statusCode: 200, data: [userMessage] };
                }
                if (!draft.data) {
                  draft.data = [];
                }
                const exists = draft.data.some((m: any) => m.id === userMessage.id);
                if (!exists) {
                  draft.data.push(userMessage);
                }
              })
            );
          }
        } catch (error) {
          console.error('Error updating cache on sendMessage:', error);
        }
      },
    }),

    // Knowledge Base & Upload Flow
    getKnowledgeBases: builder.query<any, { assignment_id?: string } | void>({
      query: (params) => ({
        url: '/chats/knowledge-bases',
        params: params || {},
      }),
      providesTags: ['KnowledgeBase'],
    }),
    createKnowledgeBase: builder.mutation<any, { scope: string; assignment_id?: string; description: string; s3_paths: string[] }>({
      query: (kbPayload) => ({
        url: '/chats/knowledge-bases',
        method: 'POST',
        body: kbPayload,
      }),
      invalidatesTags: ['KnowledgeBase'],
    }),
    generatePresignedUrls: builder.mutation<any, { files: Array<{ fileName: string; fileType: string; fileSize: number }> }>({
      query: (payload) => ({
        url: '/chats/conversations/presigned-urls',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useGetAssignmentByIdQuery,
  useGetChatsQuery,
  useCreateChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  useGetKnowledgeBasesQuery,
  useCreateKnowledgeBaseMutation,
  useGeneratePresignedUrlsMutation,
} = apiSlice;
