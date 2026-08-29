import { baseApi } from '@/services/api/baseApi'

// Matches backend src/routes/notifications.routes.js + src/controllers/notifications.controller.js.
export const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Member: own notifications. Response: { count, notifications }
    getMyNotifications: builder.query({
      query: () => '/notifications/mine',
      providesTags: (result) =>
        result
          ? [
              ...result.notifications.map(({ _id }) => ({ type: 'Notification', id: _id })),
              { type: 'Notification', id: 'MINE' },
            ]
          : [{ type: 'Notification', id: 'MINE' }],
    }),

    markNotificationRead: builder.mutation({
      query: (id) => ({ url: `/notifications/${id}/read`, method: 'PATCH' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Notification', id },
        { type: 'Notification', id: 'MINE' },
      ],
    }),

    // Staff: event log. Optional ?eventType= filter. Response: { count, events }
    getStaffNotifications: builder.query({
      query: (params) => ({ url: '/notifications/staff', params }),
      providesTags: [{ type: 'StaffNotification', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetMyNotificationsQuery,
  useMarkNotificationReadMutation,
  useGetStaffNotificationsQuery,
} = notificationsApi
