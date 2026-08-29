import { baseApi } from '@/services/api/baseApi'

// Matches backend src/routes/messages.routes.js + src/controllers/messages.controller.js.
export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Member: own messages. Response: { count, messages }
    getMyMessages: builder.query({
      query: () => '/messages/mine',
      providesTags: (result) =>
        result
          ? [
              ...result.messages.map(({ _id }) => ({ type: 'Message', id: _id })),
              { type: 'Message', id: 'MINE' },
            ]
          : [{ type: 'Message', id: 'MINE' }],
    }),

    // Response: { message } - marks readAt as a side effect of viewing.
    getMessageById: builder.query({
      query: (id) => `/messages/${id}`,
      providesTags: (result, error, id) => [{ type: 'Message', id }],
    }),

    // Staff only. body: { recipientId, subject, body }. Response: { message, data }
    sendMessage: builder.mutation({
      query: (body) => ({ url: '/messages', method: 'POST', body }),
      invalidatesTags: [{ type: 'Message', id: 'MINE' }],
    }),
  }),
})

export const {
  useGetMyMessagesQuery,
  useGetMessageByIdQuery,
  useSendMessageMutation,
} = messagesApi
