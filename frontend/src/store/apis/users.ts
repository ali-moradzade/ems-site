import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CONFIG} from "../../config";

export interface User {
    id: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
}

export interface AuthResponse {
    token: string;
}

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.BACKEND_URL}/users`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        userProfile: builder.query<User, void>({
            query: () => `/profile`,
        }),
        signup: builder.mutation<AuthResponse, Partial<User>>({
            query: (user) => ({
                url: "/signup",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useUserProfileQuery,
    useSignupMutation,
    useLoginMutation,
} = usersApi;
