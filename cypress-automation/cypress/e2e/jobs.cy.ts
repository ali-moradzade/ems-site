import {recurse} from 'cypress-recurse';

function deleteAllJobsHelper(rowCount: number) {
    if (rowCount < 1) {
        return;
    }

    cy.get('#jobs_table tr:last').then($el => {
        const id = $el.find('td:first').text();
        cy.wrap($el.find('td:last')).click({force: true});

        cy.get(`#delete_job_${id} .btn-danger`).click({force: true}).wait(100)
            .then(() => deleteAllJobsHelper(--rowCount));
    });
}

function deleteAllJobs() {
    cy.get('#jobs_table tbody')
        .then(($el) => {
            const elements = $el.find('tr').length;
            cy.log(elements.toString());

            if (elements > 0) {
                deleteAllJobsHelper(elements);
            }
        });
}

function insertJob(job: { name: string, date: string }) {
    cy.contains('Add Job').click();

    // Handling flaky inputs
    recurse(
        () => cy.get('#add_job input[name=date]').clear().type(job.date),

        ($input) => $input.val() === job.date,
    ).should('have.value', job.date);

    recurse(
        () => cy.get('#add_job input[name=name]').clear().type(job.name),

        ($input) => $input.val() === job.name,
    ).should('have.value', job.name);

    cy.get('#add_job .btn-success').click();

    cy.get('#jobs_table > tbody tr td').contains(job.name).should('exist');
}

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
        it.only('shows job details', () => {
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

            cy.get('#jobs_table tr').each(($el, index) => {
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

            cy.get('tr td:nth-child(2)').each(($el, index) => {
                const text = $el.text();

                if (text === job.name) {
                    cy.get('tr td:nth-child(2)').eq(index).next().next().click();

                    // Handle Flaky Inputs
                    recurse(
                        () => cy.get('.modal-dialog').find('input').eq(0)
                            .clear().type(newJob.date),

                        ($input) => $input.val() === newJob.date,
                    ).should('have.value', newJob.date);
                    recurse(
                        () => cy.get('.modal-dialog').find('input').eq(1)
                            .clear().type(newJob.name),

                        ($input) => $input.val() === newJob.name,
                    ).should('have.value', newJob.name);

                    cy.get('.modal-dialog').contains('Update Job').click();

                    cy.get('tr td').contains(newJob.name).should('exist');
                }

                deleteAllJobs();
            });
        });
    });
});
