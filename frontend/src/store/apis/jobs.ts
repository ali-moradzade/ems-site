import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CONFIG} from "../../config";

export interface Job {
    id: string;
    title: string;
    description: string;
    companyId: string;
    creationDate: Date;
    expirationDate: Date;
}

export const jobsApi = createApi({
    reducerPath: "jobsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.BACKEND_URL}/jobs`,
    }),
    tagTypes: ["Job", "JobItem"],
    endpoints: (builder) => ({
        getAllJobs: builder.query<Job[], void>({
            query: () => '',
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
    }),
});

// Export hooks for usage in components
export const {
    useGetAllJobsQuery,
    useGetJobQuery,
} = jobsApi;
