import {login} from "./utils";
import {USER} from "./config";

describe('Profile', () => {
    it('logged in user, shows its profile', () => {
        login();
        cy.get('.navbar .nav-item').contains('Profile').click();

        cy.get('table').should('be.visible');
        cy.get("table tbody").within(() => {
            cy.get("tr").contains("Id").next().should("not.be.empty");
            cy.get("tr").contains("Email").next().should("contain.text", USER.email);
            cy.get("tr").contains("First Name").next().should("not.be.empty");
            cy.get("tr").contains("Last Name").next().should("not.be.empty");
        });
    });
});