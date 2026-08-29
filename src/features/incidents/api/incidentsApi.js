import { baseApi } from '@/services/api/baseApi'

// Matches backend src/routes/incidents.routes.js + src/controllers/incidents.controller.js.
export const incidentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public - no auth required. Response: { incident }
    trackIncident: builder.query({
      query: (refNum) => `/incidents/track/${refNum}`,
    }),

    // Member: incidents they submitted. Response: { count, incidents }
    getMyIncidents: builder.query({
      query: () => '/incidents/mine',
      providesTags: (result) =>
        result
          ? [
              ...result.incidents.map(({ _id }) => ({ type: 'Incident', id: _id })),
              { type: 'Incident', id: 'MINE' },
            ]
          : [{ type: 'Incident', id: 'MINE' }],
    }),

    // Member or staff (ownership/role checked server-side). Response: { incident }
    getIncidentById: builder.query({
      query: (id) => `/incidents/${id}`,
      providesTags: (result, error, id) => [{ type: 'Incident', id }],
    }),

    // Staff only. Supports ?status=&category=&district= filters.
    // Response: { count, incidents }
    getAllIncidents: builder.query({
      query: (params) => ({ url: '/incidents', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.incidents.map(({ _id }) => ({ type: 'Incident', id: _id })),
              { type: 'Incident', id: 'LIST' },
            ]
          : [{ type: 'Incident', id: 'LIST' }],
    }),

    // Member. Multipart - evidenceFiles must be a FormData field of the
    // same name (upload.array('evidenceFiles', 5) on the backend), so this
    // takes a FormData body directly rather than a plain object. Do NOT set
    // a Content-Type header here - the browser sets the multipart boundary.
    createIncident: builder.mutation({
      query: (formData) => ({ url: '/incidents', method: 'POST', body: formData }),
      invalidatesTags: [{ type: 'Incident', id: 'MINE' }],
    }),

    // Staff only. body: { status, note }. Response includes the updated
    // timeline, so refetch the single incident + both list views.
    updateIncidentStatus: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/incidents/${id}/status`, method: 'PATCH', body }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Incident', id },
        { type: 'Incident', id: 'LIST' },
        { type: 'Incident', id: 'MINE' },
      ],
    }),
  }),
})

export const {
  useTrackIncidentQuery,
  useGetMyIncidentsQuery,
  useGetIncidentByIdQuery,
  useGetAllIncidentsQuery,
  useCreateIncidentMutation,
  useUpdateIncidentStatusMutation,
} = incidentsApi
