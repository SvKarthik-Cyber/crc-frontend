import { createSlice } from '@reduxjs/toolkit'

const STORAGE_KEY = 'crc.auth'

function loadPersistedAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.accessToken || !parsed?.refreshToken || !parsed?.user) return null
    return parsed
  } catch {
    return null
  }
}

function persistAuth(state) {
  try {
    if (state.isAuthenticated) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      )
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // localStorage unavailable (private browsing, etc.) - auth still works
    // for the current tab, it just won't survive a refresh.
  }
}

const persisted = loadPersistedAuth()

const initialState = {
  user: persisted?.user ?? null,
  accessToken: persisted?.accessToken ?? null,
  refreshToken: persisted?.refreshToken ?? null,
  isAuthenticated: Boolean(persisted),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // action.payload: { user, accessToken, refreshToken } - the shape every
    // auth.controller.js response uses (register/login/refresh all return
    // accessToken + refreshToken alongside the user).
    setAuthenticatedUser(state, action) {
      const { user, accessToken, refreshToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isAuthenticated = true
      persistAuth(state)
    },
    // Used after a successful /auth/refresh: keeps the user, swaps tokens.
    setRefreshedTokens(state, action) {
      const { accessToken, refreshToken } = action.payload
      state.accessToken = accessToken
      state.refreshToken = refreshToken
      persistAuth(state)
    },
    clearAuthentication(state) {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      persistAuth(state)
    },
  },
})

export const { setAuthenticatedUser, setRefreshedTokens, clearAuthentication } = authSlice.actions

export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAccessToken = (state) => state.auth.accessToken
export const selectRefreshToken = (state) => state.auth.refreshToken

export default authSlice.reducer
