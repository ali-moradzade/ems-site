import {login} from "./utils";

describe('Logout', () => {
    it('after successful login, pressing logout, logs user out', () => {
        login();

        cy.get('#logout_btn').click();
        cy.url().should('include', '/login');
    });
});