import {Dashboard} from "../components/Dashboard";
import {useGetAllJobsQuery} from "../store";

export function DashboardPage() {
    const {data: jobs} = useGetAllJobsQuery('');

    if (!jobs) {
        return (
            <div>Error getting data</div>
        );
    }

    const cards = [
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
