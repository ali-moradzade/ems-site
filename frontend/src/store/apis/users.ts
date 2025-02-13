import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CONFIG} from "../../config";

export interface User {
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
        baseUrl: `${CONFIG.BACKEND_URL}`,
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
            query: () => `/whoami`,
        }),
        signup: builder.mutation<AuthResponse, User>({
            query: (user) => ({
                url: "/auth/signup",
                method: "POST",
                body: user,
            }),
        }),
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        updateUser: builder.mutation<User, { id: number; attrs: Partial<User> }>({
            query: ({id, attrs}) => ({
                url: `/auth/${id}`,
                method: "PUT",
                body: attrs,
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useUserProfileQuery,
    useSignupMutation,
    useLoginMutation,
    useUpdateUserMutation,
} = usersApi;
