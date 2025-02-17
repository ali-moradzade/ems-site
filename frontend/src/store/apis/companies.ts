import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CONFIG} from "../../config";

export interface Company {
    id: string;
    name: string;
    description: string;
    logo: string;
}

export const companiesApi = createApi({
    reducerPath: "companiesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.BACKEND_URL}/companies`
    }),
    tagTypes: ['Companies', 'CompanyItem'],
    endpoints: (builder) => ({
        getAllCompanies: builder.query<Company[], void>({
            query: () => '',
            providesTags: ['Companies']
        }),
        getCompany: builder.query<Company, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => (result ? [{type: "CompanyItem", id}] : []),
        }),
    })
});

export const {
    useGetAllCompaniesQuery,
    useGetCompanyQuery,
} = companiesApi;
