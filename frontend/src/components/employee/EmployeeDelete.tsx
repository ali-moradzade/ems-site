import {FormEvent, useRef} from "react";
import {Employee, useDeleteEmployeeMutation} from "../../store";

interface EmployeeDeleteProps {
    employee: Employee;
}

export function EmployeeDelete({employee}: EmployeeDeleteProps) {
    const {id, firstName, lastName} = employee;
    const [deleteEmployee, {error, isLoading}] = useDeleteEmployeeMutation();

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await deleteEmployee(id).unwrap();
            closeRef.current?.click();
        } catch (e: any) {
            console.error(e?.message || 'Error deleting employee');
        }
    };

    return (
        <div className="modal fade" id={`delete_employee_${id}`} tabIndex={-1}
             aria-labelledby={`delete_employee_${id}`} aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete Employee Confirmation</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {error &&
                            <div className="alert alert-danger" role="alert" id={`edit_job_${id}_alert`}>
                                {(error as any)?.data?.message || 'Error deleting employee'}
                            </div>
                        }
                        <form onSubmit={handleSubmit} id={`delete_employee_${id}_form`}>
                            <div className="mb-3">
                                <p>
                                    Are you sure you want to delete <span
                                    className="fw-bold">"{`${firstName} ${lastName}`}"</span>?
                                </p>
                            </div>
                            <div className="mb-3 float-end">
                                <button className="btn btn-danger btn-sm" name="delete_btn">
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status"
                                              aria-hidden="true"></span>
                                    ) : (
                                        'Yes'
                                    )}
                                </button>
                                <button className="btn btn-secondary btn-sm ms-2" name="cancel">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
