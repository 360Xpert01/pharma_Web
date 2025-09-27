import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "@/types/user"

type AuthState = {
  token: string | null
  user: User | null
}

const initialState: AuthState = {
  token: null,
  user: null,
}

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<{ token: string; user: User }>) {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    clearSession(state) {
      state.token = null
      state.user = null
    },
  },
})

export const authActions = slice.actions
export default slice.reducer

export const selectIsAuthenticated = (s: { auth: AuthState }) => Boolean(s.auth.token)
export const selectUser = (s: { auth: AuthState }) => s.auth.user
export const selectToken = (s: { auth: AuthState }) => s.auth.token