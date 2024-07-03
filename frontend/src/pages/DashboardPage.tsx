import {Dashboard} from "../components/Dashboard";

export function DashboardPage() {
    const cards = [
        {
            title: 'Employees',
            size: 254,
            link: '/employees',
        },
        {
            title: 'Jobs',
            size: 24,
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
