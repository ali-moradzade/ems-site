import {FormEvent, useRef, useState} from "react";
import {useJobContext} from "../../hooks/use-job-context";

export function JobCreate() {
    const {createJob} = useJobContext();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const closeRef = useRef<HTMLButtonElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createJob({
            name, date,
        }).then();

        // close the modal
        closeRef.current?.click();

        // clear the fields
        setName('');
        setDate('');
    };

    // TODO: handle form validation
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
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                {/* TODO: fix-> change type:date */}
                                <input
                                    type="text" className="form-control form-control-sm" required
                                    placeholder="date: yyyy-mm-dd"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control form-control-sm"
                                       placeholder="Job Name" required
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-sm btn-success w-100">
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
