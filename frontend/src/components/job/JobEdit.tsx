import {Job} from "../../apis/jobs";
import {FormEvent, useRef, useState} from "react";
import {useJobContext} from "../../hooks/use-job-context";

interface JobEditProps {
    job: Job;
}

export function JobEdit({job}: JobEditProps) {
    const {id} = job;
    const {updateJob} = useJobContext();

    const [name, setName] = useState(job.name);
    const [date, setDate] = useState(job.date);

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateJob(id, {
            name, date,
        }).then();

        closeRef.current?.click();
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
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                {/* TODO: fix change type to date */}
                                <input
                                    type="text" className="form-control form-control-sm" required placeholder="Date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm" placeholder="Job Name"
                                       required
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-sm btn-success w-100">
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
