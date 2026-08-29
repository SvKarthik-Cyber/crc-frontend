import { baseApi } from '@/services/api/baseApi'

// Matches backend src/routes/admin.routes.js, the staff-facing portion of
// src/routes/auth.routes.js, and src/routes/chats.routes.js.
export const staffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST /api/v1/staff/login. Response shape differs from member login -
    // it returns `admin` instead of `user` - normalized here so callers can
    // pass the result straight to setAuthenticatedUser({ user, accessToken, refreshToken }).
    adminLogin: builder.mutation({
      query: (body) => ({ url: '/staff/login', method: 'POST', body }),
      transformResponse: (response) => ({
        ...response,
        user: response.admin,
      }),
    }),

    // GET /api/v1/staff/incidents (admin only). Same shape as incidentsApi's
    // getAllIncidents, but this is the route staff-management pages that
    // need admin-only access (not volunteer/police) should call.
    adminGetAllIncidents: builder.query({
      query: (params) => ({ url: '/staff/incidents', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.incidents.map(({ _id }) => ({ type: 'Incident', id: _id })),
              { type: 'Incident', id: 'LIST' },
            ]
          : [{ type: 'Incident', id: 'LIST' }],
    }),

    adminUpdateIncidentStatus: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/staff/incidents/${id}`, method: 'PATCH', body }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Incident', id },
        { type: 'Incident', id: 'LIST' },
        { type: 'Incident', id: 'MINE' },
      ],
    }),

    // Registration review pipeline (PENDING_ADVISORY -> PENDING_POLICE_VERIFICATION
    // -> APPROVED_TEMPORARY, see auth.controller.js). body: { userId }
    forwardToAdvisory: builder.mutation({
      query: (body) => ({ url: '/auth/forward-advisory', method: 'POST', body }),
      invalidatesTags: [{ type: 'Registration', id: 'LIST' }],
    }),

    // Response includes a one-time temporaryPassword (OTP) the staff member
    // must relay to the applicant out of band - the backend never emails it.
    approvePoliceVerification: builder.mutation({
      query: (body) => ({ url: '/auth/approve-police', method: 'POST', body }),
      invalidatesTags: [{ type: 'Registration', id: 'LIST' }],
    }),

    // Internal staff chat (room-based). REST is a fallback for history/send;
    // live updates go over the socket events in src/sockets/chat.socket.js.
    getRoomHistory: builder.query({
      query: ({ room, limit }) => ({ url: `/chats/${room}/messages`, params: { limit } }),
      providesTags: (result, error, { room }) => [{ type: 'Chat', id: room }],
    }),

    postRoomMessage: builder.mutation({
      query: ({ room, body }) => ({ url: `/chats/${room}/messages`, method: 'POST', body: { body } }),
      invalidatesTags: (result, error, { room }) => [{ type: 'Chat', id: room }],
    }),
  }),
})

export const {
  useAdminLoginMutation,
  useAdminGetAllIncidentsQuery,
  useAdminUpdateIncidentStatusMutation,
  useForwardToAdvisoryMutation,
  useApprovePoliceVerificationMutation,
  useGetRoomHistoryQuery,
  usePostRoomMessageMutation,
} = staffApi
