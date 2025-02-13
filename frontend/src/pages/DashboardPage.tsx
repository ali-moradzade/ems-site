import {Dashboard} from "../components/Dashboard";
import {useGetAllEmployeesQuery, useGetAllJobsQuery} from "../store";

export function DashboardPage() {
    const {data: employees} = useGetAllEmployeesQuery('');
    const {data: jobs} = useGetAllJobsQuery('');

    if (!employees || !jobs) {
        return (
            <div>Error getting data</div>
        );
    }

    const cards = [
        {
            title: 'Employees',
            size: employees.length,
            link: '/employees',
        },
        {
            title: 'Jobs',
            size: jobs.length,
            link: '/jobs',
        },
    ];

    return (
        <div>
            <div className="container-fluid">
                <Dashboard cards={cards}/>
            </div>
        </div>
    );
}
