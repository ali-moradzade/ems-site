import {recurse} from 'cypress-recurse';
import {deleteAllJobs, insertJob} from "./utils";

describe('Job', () => {
    const url = 'http://localhost:3000/jobs';

    describe('Add Job', () => {
        it('given job properties, creates job', () => {
            cy.visit(url);

            const job = {
                name: 'Web Developer',
                date: '2022-10-09',
            };

            insertJob(job);

            deleteAllJobs();
        });
    });

    describe('Job Details', () => {
        it('shows job details', () => {
            cy.visit(url);

            const job = {
                name: 'Graphic Designer',
                date: '2023-11-08',
            };

            insertJob(job);
            insertJob(job);
            insertJob(job);
            insertJob(job);
            insertJob(job);

            let firstTime = true; // handle job with duplicate name

            cy.get('#jobs_table tr').each(($el ) => {
                const id = $el.find('td:first').text();
                const name = $el.find('td:nth-child(2)').text();

                if (name === job.name && firstTime) {
                    cy.wrap($el.find('td:nth-child(3)')).click({force: true});
                    firstTime = false;

                    for (let key in job) {
                        cy.get(`#job_details_${id}_table tr td`).contains(job[key]).should('exist');
                    }
                }
            });

            deleteAllJobs();
        });
    });

    describe('Job Edit', () => {
        it('given job properties, updates the job', () => {
            cy.visit(url);

            const job = {
                name: 'Graphic Designer',
                date: '2023-02-01',
            };

            const newJob = {
                name: 'Web Developer',
                date: '2022-08-10',
            };

            insertJob(job);

            cy.get('#jobs_table tr').each(($el) => {
                const id = $el.find('td:nth-child(1)').text();
                const name = $el.find('td:nth-child(2)').text();

                if (name === job.name) {
                    cy.wrap($el.find('td:nth-child(4)')).click();

                    // Handle Flaky Inputs
                    recurse(
                        () => cy.get(`#edit_job_${id}_form input[name=date]`)
                            .clear().type(newJob.date),

                        ($input) => $input.val() === newJob.date,
                    ).should('have.value', newJob.date);
                    recurse(
                        () => cy.get(`#edit_job_${id}_form input[name=name]`)
                            .clear().type(newJob.name),

                        ($input) => $input.val() === newJob.name,
                    ).should('have.value', newJob.name);

                    cy.get(`#edit_job_${id}_form`).contains('Update Job').click();

                    cy.get('#jobs_table tr td').contains(newJob.name).should('exist');
                }
            });

            deleteAllJobs();
        });
    });
});
