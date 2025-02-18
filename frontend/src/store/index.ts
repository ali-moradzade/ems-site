import {configureStore} from "@reduxjs/toolkit";
import {companiesApi} from "./apis/companies";
import {setupListeners} from "@reduxjs/toolkit/query";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {jobsApi} from "./apis/jobs";
import {usersApi} from "./apis/users";
import {authReducer} from "./slices/authSlice";

export const store = configureStore({
    reducer: {
        [companiesApi.reducerPath]: companiesApi.reducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(companiesApi.middleware)
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
    useGetCompanyQuery,
    useGetAllCompaniesQuery,
} from './apis/companies';
export type {Company} from './apis/companies';

export {
    useGetAllJobsQuery,
    useGetJobQuery,
} from './apis/jobs';
export type {Job} from './apis/jobs';

export {
    useUserProfileQuery,
    useSignupMutation,
    useLoginMutation,
} from './apis/users';
export type {User} from './apis/users';
