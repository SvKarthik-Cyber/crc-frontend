import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  clearAuthentication,
  selectRefreshToken,
  setRefreshedTokens,
} from '@/features/auth/state/authSlice'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// Wraps fetchBaseQuery: on a 401 (expired/invalid access token), calls
// POST /auth/refresh with the stored refresh token, saves the new token
// pair, and retries the original request exactly once. If the refresh
// itself fails (refresh token expired/invalid - backend returns 401), the
// user is logged out. Mirrors src/controllers/auth.controller.js#refreshToken.
let refreshInFlight = null

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshToken = selectRefreshToken(api.getState())

    if (!refreshToken) {
      api.dispatch(clearAuthentication())
      return result
    }

    // Multiple queries can 401 at once (e.g. on initial page load); only
    // fire one refresh request and let the others wait on it.
    refreshInFlight ??= rawBaseQuery(
      { url: '/auth/refresh', method: 'POST', body: { refreshToken } },
      api,
      extraOptions,
    ).finally(() => {
      refreshInFlight = null
    })

    const refreshResult = await refreshInFlight

    if (refreshResult.data?.accessToken) {
      api.dispatch(setRefreshedTokens(refreshResult.data))
      result = await rawBaseQuery(args, api, extraOptions)
    } else {
      api.dispatch(clearAuthentication())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Registration',
    'Incident',
    'Advisory',
    'Notification',
    'Message',
    'StaffNotification',
    'Chat',
  ],
  endpoints: () => ({}),
})
