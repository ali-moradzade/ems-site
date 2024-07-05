import {Dashboard} from "../components/Dashboard";
import {useEmployeeContext} from "../hooks/use-employee-context";
import {useJobContext} from "../hooks/use-job-context";

export function DashboardPage() {
    const {employees} = useEmployeeContext();
    const {jobs} = useJobContext();

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
