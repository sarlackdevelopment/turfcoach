describe('City List Filtering', () => {
    it('filters cities by name', () => {
        cy.visit('http://localhost:8080');

        cy.get('th').contains('City').click();

        cy.get('input[placeholder="City name"]').type('Berlin');

        cy.get('.city-list-table tbody tr').each(($el) => {
            cy.wrap($el).contains('Berlin');
        });
    });
});
