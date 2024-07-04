import {FormEvent, useState} from "react";
import {useEmployeeContext} from "../../hooks/use-employee-context";

export function EmployeeCreate() {
    const {createEmployee} = useEmployeeContext();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState<Date>(new Date());
    const [phone, setPhone] = useState('');
    const [job, setJob] = useState('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createEmployee({firstName, lastName, email, date: date.toString(), phone, job}).then();
        console.log(firstName, lastName, email, date, phone, job);
    };

    return (
        <div className="modal fade" id="add_employee" tabIndex={-1} aria-labelledby="add_employee"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add Employee Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="date" className="form-control form-control-sm" required
                                    value={date.toString()}
                                    onChange={e => setDate(new Date(e.target.value))}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm"
                                    placeholder="Employee First Name" required
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm"
                                    placeholder="Employee Last Name" required
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="email" className="form-control form-control-sm"
                                    placeholder="Employee Email" required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="tel" className="form-control form-control-sm"
                                       placeholder="Employee Phone Number" required
                                       value={phone}
                                       onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <select className="form-control form-control-sm">
                                    {/*TODO: handle job*/}
                                    <option value="Graphic Designer">Graphic Designer</option>
                                    <option value="Web Designer">Web Designer Designer</option>
                                    <option value="Web Developer">Web Developer</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-sm btn-success w-100">
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
