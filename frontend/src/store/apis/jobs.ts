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
        baseUrl: `${CONFIG.BACKEND_URL}/jobs`,
    }),
    tagTypes: ["Job", "JobItem"],
    endpoints: (builder) => ({
        getAllJobs: builder.query<Job[], string | undefined>({
            query: (name) => ({
                url: "",
                params: name ? {name} : {},
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({id}) => ({type: "JobItem", id} as const)),
                        {type: "Job", id: "LIST"}
                    ]
                    : [{type: "Job", id: "LIST"}],
        }),
        getJob: builder.query<Job, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => (result ? [{type: "JobItem", id}] : []),
        }),
        createJob: builder.mutation<Job, { name: string; date: string }>({
            query: (job) => ({
                url: "",
                method: "POST",
                body: job,
            }),
            invalidatesTags: (result) => (result ? [{type: "Job", id: "LIST"}] : []),
        }),
        updateJob: builder.mutation<Job, { id: number; attrs: Partial<Job> }>({
            query: ({id, attrs}) => ({
                url: `/${id}`,
                method: "PUT",
                body: attrs,
            }),
            invalidatesTags: (result, error, {id}) => (result ? [{type: "JobItem", id}] : []),
        }),
        deleteJob: builder.mutation<Job, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => (result ? [{type: "JobItem", id}, {type: "Job", id: "LIST"}] : []),
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
