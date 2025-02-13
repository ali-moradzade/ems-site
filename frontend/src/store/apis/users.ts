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
        baseUrl: `${CONFIG.BACKEND_URL}/auth`,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as any).auth.token;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], string | undefined>({
            query: (email) => ({
                url: "",
                params: email ? {email} : {},
            }),
        }),
        getUser: builder.query<User, number>({
            query: (id) => `/${id}`,
        }),
        userProfile: builder.query<User, void>({
            query: () => `/whoami`,
        }),
        signup: builder.mutation<AuthResponse, User>({
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
        updateUser: builder.mutation<User, { id: number; attrs: Partial<User> }>({
            query: ({id, attrs}) => ({
                url: `/${id}`,
                method: "PUT",
                body: attrs,
            }),
        }),
        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllUsersQuery,
    useGetUserQuery,
    useUserProfileQuery,
    useSignupMutation,
    useLoginMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;
