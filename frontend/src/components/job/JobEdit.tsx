import {Job} from "../../apis/jobs";
import {FormEvent, useRef, useState} from "react";
import {useJobContext} from "../../hooks/use-job-context";
import {AxiosError} from "axios";

interface JobEditProps {
    job: Job;
}

export function JobEdit({job}: JobEditProps) {
    const {id} = job;
    const {updateJob} = useJobContext();

    const [name, setName] = useState(job.name);
    const [date, setDate] = useState(job.date);

    const [error, setError] = useState<null | string>(null);
    const [hasDateError, setHasDateError] = useState(false);

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        setHasDateError(false);

        // Date validation
        const dateRegex = /^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/;
        if (!dateRegex.test(date)) {
            setHasDateError(true);
            return;
        }

        try {
            await updateJob(id, {
                name, date,
            });

            closeRef.current?.click();
        } catch (e: any) {
            e = e as AxiosError;

            setError(`Creation failed: ${e.response.data.message}`);
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
                                {error}
                            </div>
                        }
                        <form onSubmit={handleSubmit} id={`edit_job_${id}_form`}>
                            <div className="mb-3">
                                <input
                                    type="text" required placeholder="Date" name="date"
                                    className={`form-control form-control-sm ${hasDateError ? 'is-invalid' : ''}`}
                                    value={date.toString().split('T')[0]}
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
                                <button type="submit" className="btn btn-sm btn-success w-100" name="update_job_btn">
                                    Update Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
