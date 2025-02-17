import {Card, Dashboard} from "../components/Dashboard";
import {useAppSelector, useGetAllJobsQuery} from "../store";

export function DashboardPage() {
    const {data: jobs} = useGetAllJobsQuery('');
    const user = useAppSelector(state => state.auth.user);

    const cards: Card[] = [];

    if (user) {
        cards.push({
            title: <div>Profile</div>,
            link: '/profile',
            linkText: 'View Profile'
        });
    }

    if (jobs) {
        cards.push(
            {
                title: <div>{jobs.length} <small className="text-muted">Jobs</small></div>,
                link: '/jobs',
                linkText: 'View All'
            },
        );
    }

    return (
        <div>
            <div className="container-fluid">
                <Dashboard cards={cards}/>
            </div>
        </div>
    );
}
