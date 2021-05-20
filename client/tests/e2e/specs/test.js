// https://docs.cypress.io/api/introduction/api.html

const searchRoute = () => {
  cy.server();
  cy.route("POST", "/", {
    status: 200,
    data: [{ "source": "Hello", "target": "Hola" }, { "source": "Hello World", "target": "Hola mundo" }], message: "Search result successfully"
  }).as("search");
}

// const importRoute = () => {
//   cy.server();
//   cy.route("POST", "/import", {
//     status: 200,
//     data: [{ "source": "Hello", "target": "Hola" }, { "source": "Hello World", "target": "Hola mundo" }], message: "Search result successfully"
//   }).as("import");
// }

describe("Test search page", () => {
  it("Visits the search url", () => {
    // searchRoute();
    // cy.wait('@search')
    cy.visit("/");
    cy.contains("label", "Search");
    cy.contains("button", "Search");
  })
})

// describe("Test history page", () => {
//   it("Visits the app root url", () => {
//     cy.visit("/history")
//     cy.contains("h1", "Welcome to Your Vue.js App")
//   })
// })

// describe("Test import page", () => {
//   importRoute();
//   it("Visits the app root url", () => {
//     cy.visit("/import")
//     cy.contains("h1", "Welcome to Your Vue.js App")
//   })
// })