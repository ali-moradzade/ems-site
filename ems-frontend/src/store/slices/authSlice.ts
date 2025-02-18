import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../apis/users";

interface AuthState {
    token: string | null;
    user: User | null;
}

const storedToken = localStorage.getItem("token")
const storedUser = localStorage.getItem("user")

const initialState: AuthState = {
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthState>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;

            localStorage.setItem("token", action.payload.token || '')
            localStorage.setItem("user", JSON.stringify(action.payload.user || null));
        },
        logout: (state) => {
            state.token = null;
            state.user = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const {setCredentials, logout} = authSlice.actions;
export const authReducer = authSlice.reducer;
