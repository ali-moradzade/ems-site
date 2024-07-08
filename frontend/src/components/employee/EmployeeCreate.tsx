import {FormEvent, useRef, useState} from "react";
import {useEmployeeContext} from "../../hooks/use-employee-context";
import {useJobContext} from "../../hooks/use-job-context";
import {isPhoneNumber} from "class-validator";
import {AxiosError} from "axios";

export function EmployeeCreate() {
    const {createEmployee} = useEmployeeContext();
    const {jobs} = useJobContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [phone, setPhone] = useState('');
    const [job, setJob] = useState(jobs[0]?.name || 'Unemployed');

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
            // setError('Date must be in yyyy-mm-dd format');
            setValidationErrors(prev => ({...prev, date: true}));
            hasErrors = true;
        }

        // Phone validation
        if (!isPhoneNumber(phone)) {
            // setError('Invalid phone number, Please enter a valid phone number, including +98 (Iran)');
            setValidationErrors(prev => ({...prev, phone: true}));
            hasErrors = true;
        }

        if (hasErrors) {
            return;
        }

        try {
            await createEmployee({
                firstName, lastName, email, date, phone, job
            });

            // close the modal
            closeRef.current?.click();

            // clear the fields
            setFirstName('');
            setLastName('');
            setEmail('');
            setDate('');
            setPhone('');
        } catch (err: any) {
            err = err as AxiosError;

            setError(`Creation failed: ${err.response.data.message}`);
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
            className="modal fade" id="add_employee" tabIndex={-1} aria-labelledby="add_employee" aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add Employee Details</h1>
                        <button
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} id="add_employee_form">
                            <div className="mb-3">
                                <input
                                    type="text" required placeholder="Date: yyyy-mm-dd" name="date"
                                    className={`form-control form-control-sm ${validationErrors.date ? 'is-invalid' : ''}`}
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                                {validationErrors.date && <div className="invalid-feedback">Invalid date format.</div>}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm" required
                                    placeholder="Employee First Name" name="first_name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm" required
                                    placeholder="Employee Last Name" name="last_name"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email" className="form-control form-control-sm" required
                                    placeholder="Employee Email" name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" required placeholder="Phone Number" name="phone"
                                    className={`form-control form-control-sm ${validationErrors.phone ? 'is-invalid' : ''}`}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                                {validationErrors.phone &&
                                    <div className="invalid-feedback">
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
                                <button type="submit" className="btn btn-sm btn-success w-100" name="add_employee_btn">
                                    Add Employee
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
