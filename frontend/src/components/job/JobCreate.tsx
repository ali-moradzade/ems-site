import {FormEvent, useRef, useState} from "react";
import {useJobContext} from "../../hooks/use-job-context";
import {AxiosError} from "axios";

export function JobCreate() {
    const {createJob} = useJobContext();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');

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
            await createJob({
                name, date,
            });

            // close the modal
            closeRef.current?.click();

            // clear the fields
            setName('');
            setDate('');
        } catch (e: any) {
            e = e as AxiosError;

            setError(`Creation failed: ${e.response.data.message}`);
        }
    };

    return (
        <div className="modal fade" id="add_job" tabIndex={-1} aria-labelledby="add_job" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add Job Details</h1>
                        <button
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {error &&
                            <div className="alert alert-danger" role="alert" id="add_job_alert">
                                {error}
                            </div>
                        }
                        <form onSubmit={handleSubmit} id="add_job_form">
                            <div className="mb-3">
                                {/* TODO: fix-> change type:date */}
                                <input
                                    type="text" required placeholder="Date: yyyy-mm-dd" name="date"
                                    className={`form-control form-control-sm ${hasDateError ? 'is-invalid' : ''}`}
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                                {hasDateError &&
                                    <div className="invalid-feedback" id="add_job_invalid_date">
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
                                <button type="submit" className="btn btn-sm btn-success w-100" name="add_job_btn">
                                    Add Job
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
