import {recurse} from "cypress-recurse";

export function deleteAllJobsHelper(rowCount: number) {
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

export function deleteAllJobs() {
    cy.get('#jobs_table tbody')
        .then(($el) => {
            const elements = $el.find('tr').length;
            cy.log(elements.toString());

            if (elements > 0) {
                deleteAllJobsHelper(elements);
            }
        });
}

export function insertJob(job: { name: string, date: string }) {
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

