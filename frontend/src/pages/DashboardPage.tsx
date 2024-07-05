import {Dashboard} from "../components/Dashboard";
import {useEmployeeContext} from "../hooks/use-employee-context";

export function DashboardPage() {
    const {employees} = useEmployeeContext();
    const cards = [
        {
            title: 'Employees',
            size: employees.length,
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
