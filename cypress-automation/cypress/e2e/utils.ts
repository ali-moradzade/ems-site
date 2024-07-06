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

export function insertEmployee(
    employee: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        job: string;
        date: string;
    }
) {
    const {date, firstName, lastName, email, phone, job} = employee;

    cy.contains('Add Employee').click();

    // Handling flaky inputs
    recurse(
        () => cy.get('#add_employee input[name=date]').clear().type(date),

        ($input) => $input.val() === date,
    ).should('have.value', date);

    recurse(
        () => cy.get('#add_employee input[name=first_name]').clear().type(firstName),

        ($input) => $input.val() === firstName,
    ).should('have.value', firstName);

    recurse(
        () => cy.get('#add_employee input[name=last_name]').clear().type(lastName),

        ($input) => $input.val() === lastName,
    ).should('have.value', lastName);

    recurse(
        () => cy.get('#add_employee input[name=email]').clear().type(email),

        ($input) => $input.val() === email,
    ).should('have.value', email);

    recurse(
        () => cy.get('#add_employee input[name=phone]').clear().type(phone),

        ($input) => $input.val() === phone,
    ).should('have.value', phone);

    cy.get('#add_employee select').select(job);

    cy.get('#add_employee .btn-success').click();


    // Verify it is inserted
    cy.get('#employees_table tr td').contains(employee.email).should('exist');
}

export function deleteAllEmployeesHelper(rowCount: number) {
    if (rowCount < 1) {
        return;
    }

    cy.get('#employees_table tr:last').then($el => {
        const id = $el.find('td:first').text();
        cy.wrap($el.find('td:last')).click({force: true});

        cy.get(`#delete_employee_${id} .btn-danger`).click({force: true}).wait(100)
            .then(() => deleteAllJobsHelper(--rowCount));
    });
}

export function deleteAllEmployees() {
    cy.get('#employees_table tbody')
        .then(($el) => {
            const elements = $el.find('tr').length;

            if (elements > 0) {
                deleteAllEmployeesHelper(elements);
            }
        });
}


export const urls = {
    jobs: 'http://localhost:3000/jobs',
    employees: 'http://localhost:3000/employees',
};

