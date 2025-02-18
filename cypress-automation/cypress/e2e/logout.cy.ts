import {recurse} from "cypress-recurse";
import {recurseDelay, urls, USER} from "./config";

describe('Logout', () => {
    it('after successful login, pressing logout, logs user out', () => {
        cy.visit(urls.login);

        // handle flaky inputs
        recurse(
            () => cy.get('input[type=email]')
                .clear().type(USER.email),

            ($input) => $input.val() === USER.email,
            {delay: recurseDelay}
        ).should('have.value', USER.email);
        recurse(
            () => cy.get('input[type=password]')
                .clear().type(USER.password),

            ($input) => $input.val() === USER.password,
            {delay: recurseDelay}
        ).should('have.value', USER.password);

        cy.get('button[type=submit]').click();

        cy.url().should('include', '/dashboard');

        cy.get('#logout_btn').click();
        cy.url().should('include', '/login');
    });
});