import {Employee} from "../../apis/employees";
import {FormEvent, useRef, useState} from "react";
import {useEmployeeContext} from "../../hooks/use-employee-context";
import {useJobContext} from "../../hooks/use-job-context";
import {isPhoneNumber} from "class-validator";
import {AxiosError} from "axios";

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

    const [error, setError] = useState<string | null>(null);
    const [validationErrors, setValidationErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        date: false,
        phone: false,
    });

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setValidationErrors({
            firstName: false,
            lastName: false,
            email: false,
            date: false,
            phone: false,
        });

        let hasErrors = false;

        // Date validation
        const dateRegex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
        if (!dateRegex.test(date)) {
            setValidationErrors(prev => ({...prev, date: true}));
            hasErrors = true;
        }

        // Phone validation
        if (!isPhoneNumber(phone)) {
            setValidationErrors(prev => ({...prev, phone: true}));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            await updateEmployee(id, {
                firstName, lastName, email, date, phone, job,
            });

            closeRef.current?.click();
        } catch (e: any) {
            e = e as AxiosError;
            setError(`Update failed: ${e.response.data.message}`);
        }
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
                        {error &&
                            <div className="alert alert-danger" role="alert" id={`edit_employee_${id}_alert`}>
                                {error}
                            </div>
                        }
                        <form onSubmit={handleSubmit} id={`edit_employee_${id}_form`}>
                            <div className="mb-3">
                                <input
                                    type="text" required name="date" placeholder="Date: yyyy-mm-dd"
                                    className={`form-control form-control-sm ${validationErrors.date ? 'is-invalid' : ''}`}
                                    value={date.toString().split('T')[0]}
                                    onChange={e => setDate(e.target.value)}
                                />
                                {validationErrors.date &&
                                    <div className="invalid-feedback" id={`edit_employee_${id}_invalid_date`}>
                                        Invalid date format
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm" required
                                    placeholder="First Name" name="first_name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm" required
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
                                <input
                                    type="tel" required placeholder="Phone Number" name="phone"
                                    className={`form-control form-control-sm ${validationErrors.phone ? 'is-invalid' : ''}`}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                                {validationErrors.phone &&
                                    <div className="invalid-feedback" id={`edit_employee_${id}_invalid_phone`}>
                                        Invalid phone number, format: +989912345678
                                    </div>
                                }
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
