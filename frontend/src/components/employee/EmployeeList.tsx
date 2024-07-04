import {useEmployeeContext} from "../../hooks/use-employee-context";

export function EmployeeList() {
    const employees = [
        {
            id: '1',
            firstName: 'John',
            lastName: 'Doe 1',
            email: 'johndoe1@gmail.com',
            phone: '+919876543210',
            job: 'Graphic Designer',
            date: '12/09/2022',
        },
        {
            id: '2',
            firstName: 'John',
            lastName: 'Doe 2',
            email: 'johndoe2@gmail.com',
            phone: '+919876543211',
            job: 'Web Designer',
            date: '11/09/2022',
        },
        {
            id: '3',
            firstName: 'John',
            lastName: 'Doe 3',
            email: 'johndoe3@gmail.com',
            phone: '+919876543212',
            job: 'Web Developer',
            date: '10/09/2022',
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

    const renderedEmployeeDetailsModals = employees.map(({id, firstName, lastName, email, phone, job, date}) => {
        return (
            <div className="modal fade" id={`employee_details_${id}`} tabIndex={-1}
                 aria-labelledby={`employee_details_${id}`}
                 aria-hidden="true" key={id}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5"> Employee Details </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped table-bordered table-hover">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td>{id}</td>
                                    </tr>
                                    <tr>
                                        <th>Joining Date</th>
                                        <td>{date}</td>
                                    </tr>
                                    <tr>
                                        <th>Name</th>
                                        <td>{`${firstName} ${lastName}`}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{email}</td>
                                    </tr>
                                    <tr>
                                        <th>Phone</th>
                                        <td>{phone}</td>
                                    </tr>
                                    <tr>
                                        <th>Job</th>
                                        <td>{job}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    const renderedEditEmployeesModals = employees.map(({id, firstName, lastName, email, phone, job, date}) => {
        return (
            <div className="modal fade" id={`edit_employee_${id}`} tabIndex={-1} aria-labelledby={`edit_employee_${id}`}
                 key={id}
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">
                                Edit Employee Details
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm" value={date}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm"
                                           placeholder="Employee Name"
                                           value={`${firstName} ${lastName}`} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control form-control-sm"
                                           placeholder="Employee Email"
                                           value={email} required/>
                                </div>
                                <div className="mb-3">
                                    <input type="tel" className="form-control form-control-sm"
                                           placeholder="Employee Phone Number" value={phone}
                                           required/>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control form-control-sm" placeholder="Job"
                                           value={job} required/>
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-sm btn-success w-100">
                                        Update Employee
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    const renderedDeleteEmployeesModals = employees.map(({id, firstName, lastName}) => {
        return (
            <div className="modal fade" id={`delete_employee_${id}`} tabIndex={-1}
                 aria-labelledby={`delete_employee_${id}`} key={id} aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Delete Employee Confirmation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <p>Are you sure you want to delete <span
                                        className="fw-bold">"{`${firstName} ${lastName}`}"</span>? </p>
                                </div>
                                <div className="mb-3 float-end">
                                    <button className="btn btn-danger btn-sm">Delete</button>
                                    <button className="btn btn-secondary btn-sm ms-2">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
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
