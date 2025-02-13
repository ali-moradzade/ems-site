import {FormEvent, useRef, useState} from "react";
import {Job, useUpdateJobMutation} from "../../store";

interface JobEditProps {
    job: Job;
}

export function JobEdit({job}: JobEditProps) {
    const {id} = job;
    const [updateJob, {isLoading, error}] = useUpdateJobMutation();

    const [name, setName] = useState(job.name);
    const [date, setDate] = useState(job.date.split('T')[0]);

    const [hasDateError, setHasDateError] = useState(false);

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setHasDateError(false);

        // Date validation
        const dateRegex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
        if (!dateRegex.test(date)) {
            setHasDateError(true);
            return;
        }

        try {
            await updateJob({
                id, attrs: {
                    name, date,
                }
            }).unwrap();

            closeRef.current?.click();
        } catch (e: any) {
            console.error(e?.message || 'Error updating job');
        }
    };

    return (
        <div className="modal fade" id={`edit_job_${id}`} tabIndex={-1} aria-labelledby={`edit_job_${id}`}
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">
                            Edit Job Details
                        </h1>
                        <button
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {error &&
                            <div className="alert alert-danger" role="alert" id={`edit_job_${id}_alert`}>
                                {(error as any)?.data?.message || 'Error updating job'}
                            </div>
                        }
                        <form onSubmit={handleSubmit} id={`edit_job_${id}_form`}>
                            <div className="mb-3">
                                <input
                                    type="text" required placeholder="Date" name="date"
                                    className={`form-control form-control-sm ${hasDateError ? 'is-invalid' : ''}`}
                                    value={date.split('T')[0]}
                                    onChange={e => setDate(e.target.value)}
                                />
                                {hasDateError &&
                                    <div className="invalid-feedback" id={`edit_job_${id}_invalid_date`}>
                                        Invalid date
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text" className="form-control form-control-sm" required
                                    placeholder="Job Name" name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-sm btn-success w-100" name="update_job_btn"
                                        disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status"
                                              aria-hidden="true"></span>
                                    ) : (
                                        'Update Job'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
