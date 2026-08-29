import { baseApi } from '@/services/api/baseApi'

// Matches backend src/routes/auth.routes.js + src/middleware/validate.js
// exactly. Field names (orgProfile / volunteerProfile / individualProfile)
// are load-bearing - the backend's zod schemas reject anything else.
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerOrganization: builder.mutation({
      query: (body) => ({ url: '/auth/register/organization', method: 'POST', body }),
    }),
    registerVolunteer: builder.mutation({
      query: (body) => ({ url: '/auth/register/volunteer', method: 'POST', body }),
    }),
    registerIndividual: builder.mutation({
      query: (body) => ({ url: '/auth/register/individual', method: 'POST', body }),
    }),

    // Response: { message, mustChangePassword, user, accessToken, refreshToken }
    login: builder.mutation({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
      invalidatesTags: ['User'],
    }),

    // Authenticated (mustChangePassword accounts can ONLY hit this route -
    // see the isChangePasswordRoute guard in src/middleware/auth.js).
    changePassword: builder.mutation({
      query: (body) => ({ url: '/auth/change-password', method: 'POST', body }),
    }),
  }),
})

export const {
  useRegisterOrganizationMutation,
  useRegisterVolunteerMutation,
  useRegisterIndividualMutation,
  useLoginMutation,
  useChangePasswordMutation,
} = authApi