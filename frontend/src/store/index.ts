import {configureStore} from "@reduxjs/toolkit";
import {employeesApi} from "./apis/employees";
import {setupListeners} from "@reduxjs/toolkit/query";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {jobsApi} from "./apis/jobs";
import {usersApi} from "./apis/users";
import {authReducer} from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [employeesApi.reducerPath]: employeesApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(employeesApi.middleware)
            .concat(jobsApi.middleware)
            .concat(usersApi.middleware);
    }
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Customized hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
    useGetAllEmployeesQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} from './apis/employees';
export type {Employee} from './apis/employees';

export {
    useGetAllJobsQuery,
    useGetJobQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} from './apis/jobs';
export type {Job} from './apis/jobs';

export {
    useGetAllUsersQuery,
    useGetUserQuery,
    useSignupMutation,
    useLoginMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} from './apis/users';
export type {User} from './apis/users';
