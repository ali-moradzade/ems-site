import {EmployeeDetails} from "./EmployeeDetails";
import {EmployeeEdit} from "./EmployeeEdit";
import {EmployeeDelete} from "./EmployeeDelete";
import {useEmployeeContext} from "../../hooks/use-employee-context";

export function EmployeeList() {
    const {employees} = useEmployeeContext();

    const renderedEmployees = employees.map(({id, firstName, lastName, email}) => {
        return (
            <tr key={id}>
                <td>{id}</td>
                <td>{`${firstName} ${lastName}`}</td>
                <td>{email}</td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#employee_details_${id}`}
                            className="btn btn-info btn-sm w-100">
                        Details
                    </button>
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#edit_employee_${id}`}
                            className="btn btn-warning btn-sm w-100">
                        Edit
                    </button>
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target={`#delete_employee_${id}`}
                            className="btn btn-danger btn-sm w-100">
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    const renderedEmployeeDetailsModals = employees.map((employee) => {
        return (
            <div key={employee.id}>
                <EmployeeDetails employee={employee}/>
            </div>
        );
    });

    const renderedEditEmployeesModals = employees.map((employee) => {
        return (
            <div key={employee.id}>
                <EmployeeEdit employee={employee}/>
            </div>
        );
    });

    const renderedDeleteEmployeesModals = employees.map((employee) => {
        return (
            <div key={employee.id}>
                <EmployeeDelete employee={employee}/>
            </div>
        );
    });

    return (
        <div>
            <table className="table table-striped table-hover bg-light table-bordered rounded shadow small">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Details</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {renderedEmployees}
                </tbody>
            </table>

            {/* Employee Details Modals */}
            {renderedEmployeeDetailsModals}

            {/* Edit Employee Modal */}
            {renderedEditEmployeesModals}

            {/* Delete Employee Modal */}
            {renderedDeleteEmployeesModals}
        </div>
    );
}
