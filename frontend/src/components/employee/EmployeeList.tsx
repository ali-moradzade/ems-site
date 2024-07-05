import {Employee} from "../../apis/employees";
import {EmployeeDetails} from "./EmployeeDetails";
import {EmployeeEdit} from "./EmployeeEdit";
import {EmployeeDelete} from "./EmployeeDelete";

export function EmployeeList() {
    const employees: Employee[] = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe 1',
            email: 'johndoe1@gmail.com',
            phone: '+919876543210',
            job: 'Graphic Designer',
            date: '2022-11-08',
        },
        {
            id: 2,
            firstName: 'John',
            lastName: 'Doe 2',
            email: 'johndoe2@gmail.com',
            phone: '+919876543211',
            job: 'Web Designer',
            date: '2022-11-09',
        },
        {
            id: 3,
            firstName: 'John',
            lastName: 'Doe 3',
            email: 'johndoe3@gmail.com',
            phone: '+919876543212',
            job: 'Web Developer',
            date: '2022-11-10',
        },
    ];


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
