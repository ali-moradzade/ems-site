import {Job} from "../../apis/jobs";
import {useJobContext} from "../../hooks/use-job-context";
import {FormEvent, useRef} from "react";

interface JobDeleteProps {
    job: Job;
}

export function JobDelete({job}: JobDeleteProps) {
    const {id, name} = job;
    const {deleteJob} = useJobContext();

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        deleteJob(id).then();

        closeRef.current?.click();
    };

    return (
        <div className="modal fade" id={`delete_job_${id}`} tabIndex={-1}
             aria-labelledby={`delete_job_${id}`} aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete Job Confirmation</h1>
                        <button
                            type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            ref={closeRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit} id={`delete_job_${id}_form`}>
                            <div className="mb-3">
                                <p>Are you sure you want to delete <span className="fw-bold">"{name}"</span>? </p>
                            </div>
                            <div className="mb-3 float-end">
                                <button className="btn btn-danger btn-sm" name="delete_btn">Yes</button>
                                <button className="btn btn-secondary btn-sm ms-2" name="cancel_btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
