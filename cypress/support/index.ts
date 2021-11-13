import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-testid attribute.
       * @memberof Cypress.Chainable
       * @example cy.getByTestId("nav-link")
       */
      getByTestId(value: string): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
