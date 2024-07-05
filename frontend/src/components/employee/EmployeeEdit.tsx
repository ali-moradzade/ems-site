import {Employee} from "../../apis/employees";
import {FormEvent, useRef, useState} from "react";
import {useEmployeeContext} from "../../hooks/use-employee-context";

interface EmployeeEditProps {
    employee: Employee;
}

export function EmployeeEdit({employee}: EmployeeEditProps) {
    const {id} = employee;
    const {updateEmployee} = useEmployeeContext();

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
                        <button
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm" required
                                       value={date}
                                       onChange={e => setDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm"
                                       placeholder="First Name" required
                                       value={firstName}
                                       onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm"
                                       placeholder="Last Name" required
                                       value={lastName}
                                       onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email" className="form-control form-control-sm" placeholder="Email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="tel" className="form-control form-control-sm"
                                       placeholder="Phone Number" required
                                       value={phone}
                                       onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <select className="form-control form-control-sm"
                                        value={job}
                                        onChange={e => setJob(e.target.value)}
                                >
                                    {/*TODO: handle job*/}
                                    <option value="Graphic Designer">Graphic Designer</option>
                                    <option value="Web Designer">Web Designer Designer</option>
                                    <option value="Web Developer">Web Developer</option>
                                </select>
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
}
