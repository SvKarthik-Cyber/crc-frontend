import { baseApi } from '@/services/api/baseApi'

// Matches backend src/routes/advisories.routes.js + src/controllers/advisory.controller.js.
export const advisoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Public - published advisories only. Response: { advisories }
    getAdvisories: builder.query({
      query: () => '/advisories',
      providesTags: (result) =>
        result
          ? [
              ...result.advisories.map(({ _id }) => ({ type: 'Advisory', id: _id })),
              { type: 'Advisory', id: 'PUBLIC' },
            ]
          : [{ type: 'Advisory', id: 'PUBLIC' }],
    }),

    // Staff (admin, advisory). Every status, optional ?status= filter.
    // Response: { count, advisories }
    getAllAdvisoriesForStaff: builder.query({
      query: (params) => ({ url: '/advisories/staff', params }),
      providesTags: (result) =>
        result
          ? [
              ...result.advisories.map(({ _id }) => ({ type: 'Advisory', id: _id })),
              { type: 'Advisory', id: 'STAFF_LIST' },
            ]
          : [{ type: 'Advisory', id: 'STAFF_LIST' }],
    }),

    // Staff. Response: { advisory }
    getAdvisoryById: builder.query({
      query: (id) => `/advisories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Advisory', id }],
    }),

    // Staff. body: { title, category, summary, content, threatLevel,
    // mitigationSteps, affectedSystems, audience, accountCategories,
    // publishImmediately }. Starts as DRAFT unless publishImmediately: true.
    createAdvisory: builder.mutation({
      query: (body) => ({ url: '/advisories', method: 'POST', body }),
      invalidatesTags: [
        { type: 'Advisory', id: 'STAFF_LIST' },
        { type: 'Advisory', id: 'PUBLIC' },
      ],
    }),

    publishAdvisory: builder.mutation({
      query: (id) => ({ url: `/advisories/${id}/publish`, method: 'PATCH' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Advisory', id },
        { type: 'Advisory', id: 'STAFF_LIST' },
        { type: 'Advisory', id: 'PUBLIC' },
      ],
    }),

    archiveAdvisory: builder.mutation({
      query: (id) => ({ url: `/advisories/${id}/archive`, method: 'PATCH' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Advisory', id },
        { type: 'Advisory', id: 'STAFF_LIST' },
        { type: 'Advisory', id: 'PUBLIC' },
      ],
    }),
  }),
})

export const {
  useGetAdvisoriesQuery,
  useGetAllAdvisoriesForStaffQuery,
  useGetAdvisoryByIdQuery,
  useCreateAdvisoryMutation,
  usePublishAdvisoryMutation,
  useArchiveAdvisoryMutation,
} = advisoriesApi
