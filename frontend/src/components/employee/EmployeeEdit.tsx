import {Employee} from "../../apis/employees";
import {FormEvent, useRef, useState} from "react";
import {useEmployeeContext} from "../../hooks/use-employee-context";
import {useJobContext} from "../../hooks/use-job-context";

interface EmployeeEditProps {
    employee: Employee;
}

export function EmployeeEdit({employee}: EmployeeEditProps) {
    const {id} = employee;
    const {updateEmployee} = useEmployeeContext();
    const {jobs} = useJobContext();

    const [firstName, setFirstName] = useState(employee.firstName);
    const [lastName, setLastName] = useState(employee.lastName);
    const [email, setEmail] = useState(employee.email);
    const [date, setDate] = useState(employee.date);
    const [phone, setPhone] = useState(employee.phone);
    const [job, setJob] = useState(employee.job);

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateEmployee(id, {
            firstName, lastName, email, date, phone, job,
        }).then();

        closeRef.current?.click();
    };

    const renderedJobs = jobs.map(job => {
        return (
            <option value={job.name} key={job.id}>
                {job.name}
            </option>
        );
    });

    return (
        <div
            className="modal fade" id={`edit_employee_${id}`} tabIndex={-1} aria-labelledby={`edit_employee_${id}`}
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Edit Employee Details
                        </h1>
                        <button
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} id={`edit_employee_${id}_table`}>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm" required
                                       name="date"
                                       value={date}
                                       onChange={e => setDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm" required
                                       placeholder="First Name" name="first_name"
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm" required
                                       placeholder="Last Name" name="last_name"
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email" className="form-control form-control-sm" required
                                    placeholder="Email" name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="tel" className="form-control form-control-sm" required
                                       placeholder="Phone Number" name="phone"
                                       value={phone}
                                       onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <select className="form-control form-control-sm" name="job"
                                        value={job}
                                        onChange={e => setJob(e.target.value)}
                                >
                                    {renderedJobs}
                                </select>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-sm btn-success w-100"
                                        name="update_employee_btn"
                                >
                                    Update Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
