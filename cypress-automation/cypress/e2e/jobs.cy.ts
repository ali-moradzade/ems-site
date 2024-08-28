import {recurse} from 'cypress-recurse';
import {deleteAllJobs, insertJob, login, recurseDelay} from "./utils";

describe('Job', () => {
    const job = {
        name: 'Web Developer',
        date: '2022-10-09',
    };

    beforeEach(() => {
        login();
        cy.get('.navbar .nav-link').contains('Jobs').click();
    });

    afterEach(() => {
        deleteAllJobs();
    });

    describe('Add', () => {
        it('given job properties, creates job', () => {
            insertJob(job);

            // Verify job inserted
            cy.get('#jobs_table > tbody tr td').contains(job.name).should('exist');
        });

        it('given invalid date, alerts', () => {
            const invalidDate = '2023-01-0';
            insertJob({...job, date: invalidDate});

            cy.get('#add_job_invalid_date').should('be.visible');
            cy.get('#add_job').find('.btn-close').click();
        });
    });

    describe('Details', () => {
        it('shows job details', () => {
            insertJob(job);
            insertJob(job);
            insertJob(job);
            insertJob(job);
            insertJob(job);
            cy.get('#jobs_table > tbody tr td').contains(job.name).should('exist');

            let firstTime = true; // handle job with duplicate name

            cy.get('#jobs_table tr').each(($el) => {
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
        });
    });

    describe('Edit', () => {
        it('given job properties, updates the job', () => {
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
                        {delay: recurseDelay},
                    ).should('have.value', newJob.date);
                    recurse(
                        () => cy.get(`#edit_job_${id}_form input[name=name]`)
                            .clear().type(newJob.name),

                        ($input) => $input.val() === newJob.name,
                        {delay: recurseDelay},
                    ).should('have.value', newJob.name);

                    cy.get(`#edit_job_${id}_form`).contains('Update Job').click();
                }
            });

            cy.get('#jobs_table tr td').contains(newJob.name).should('exist');
        });

        it('given invalid date, updating job fails and invalid date shows', () => {
            const newJob = {
                name: 'Web Developer',
                date: '2022-08-1',
            };

            insertJob(job);
            cy.get('#jobs_table tr td').contains(job.name).should('exist');

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
                        {delay: recurseDelay},
                    ).should('have.value', newJob.date);
                    recurse(
                        () => cy.get(`#edit_job_${id}_form input[name=name]`)
                            .clear().type(newJob.name),

                        ($input) => $input.val() === newJob.name,
                        {delay: recurseDelay},
                    ).should('have.value', newJob.name);

                    cy.get(`#edit_job_${id}_form`).contains('Update Job').click();

                    cy.get(`#edit_job_${id}_invalid_date`).should('be.visible');
                    cy.get(`#edit_job_${id}`).find('.btn-close').click();
                }
            });
        });
    });
});
