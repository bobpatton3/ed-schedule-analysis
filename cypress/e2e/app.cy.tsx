
describe("schedule_analyzer page populated when Load Data pressed", () => {

    beforeEach(() => {
        cy.visit("http://localhost:3000");
        cy.contains("a", "Login").click();

        cy.loginToAuth0();

        cy.visit("http://localhost:3000");
    })

    it("should load data and display", () => {
        cy.contains("button", "Load Data").click();
        cy.contains("select", "Choose your desired group");
    });
});