import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CONFIG} from "../../config";

export interface Job {
    id: number;
    name: string;
    date: string;
}

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.BACKEND_URL}/jobs`
    }),
    endpoints: (builder) => ({
        getAllJobs: builder.query<Job[], string | undefined>({
            query: (name) => ({
                url: "",
                params: name ? {name} : {},
            }),
        }),
        getJob: builder.query<Job, string>({
            query: (id) => `/${id}`,
        }),
        createJob: builder.mutation<Job, { name: string; date: string }>({
            query: (job) => ({
                url: "",
                method: "POST",
                body: job,
            }),
        }),
        updateJob: builder.mutation<Job, { id: number; attrs: Partial<Job> }>({
            query: ({id, attrs}) => ({
                url: `/${id}`,
                method: "PUT",
                body: attrs,
            }),
        }),
        deleteJob: builder.mutation<Job, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Export hooks for usage in components
export const {
    useGetAllJobsQuery,
    useGetJobQuery,
    useCreateJobMutation,
    useUpdateJobMutation,
    useDeleteJobMutation,
} = jobsApi;
