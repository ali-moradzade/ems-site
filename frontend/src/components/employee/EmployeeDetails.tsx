import {Employee} from "../../apis/employees";

interface EmployeeDetailsProps {
    employee: Employee;
}

export function EmployeeDetails({employee}: EmployeeDetailsProps) {
    const {id, firstName, lastName, email, phone, job, date} = employee;

    return (
        <div className="modal fade" id={`employee_details_${id}`} tabIndex={-1}
             aria-labelledby={`employee_details_${id}`} aria-hidden="true"
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
}
