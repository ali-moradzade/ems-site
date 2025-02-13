import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CONFIG} from "../../config";

export interface Employee {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    job: string;
    date: string;
}

export const employeesApi = createApi({
    reducerPath: "employeesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${CONFIG.BACKEND_URL}/employees`
    }),
    tagTypes: ['Employees'],
    endpoints: (builder) => ({
        getAllEmployees: builder.query<Employee[], string | undefined>({
            query: (email) => ({
                url: "",
                params: email ? {email} : {},
            }),
            providesTags: ['Employees']
        }),
        createEmployee: builder.mutation<Employee, Partial<Employee>>({
            query: (employee) => ({
                url: "",
                method: "POST",
                body: employee,
            }),
            invalidatesTags: (result, error) => (result ? ['Employees'] : [])
        }),
        updateEmployee: builder.mutation<Employee, { id: number; attrs: Partial<Employee> }>({
            query: ({id, attrs}) => ({
                url: `/${id}`,
                method: "PUT",
                body: attrs,
            }),
            invalidatesTags: (result, error, {id}) => (result ? ['Employees'] : [])
        }),
        deleteEmployee: builder.mutation<Employee, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error) => (result ? ['Employees'] : [])
        }),
    })
});

export const {
    useGetAllEmployeesQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeesApi;
