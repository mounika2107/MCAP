/// <reference types="Cypress" />

const PAGETITLE = 'h1 > font'

export default class interactivePage {

    static ValidateLandingPage() {
        cy.url().should('include', '/amort.aspx?create=table')
        cy.get(PAGETITLE).contains('Interactive Amortization Schedule').should('be.visible')
    }


    static validateInputs(price,interest,payment, frequency){
        cy.get('[width="560"] > tbody').within(() => {
            cy.contains('Mortgage Amount: ').parent().next().should('include.text', price)
            cy.contains('Interest Rate: ').parent().next().should('include.text', interest)
            cy.contains('Initial Payment: ').parent().next().should('include.text', payment)
            cy.contains('Payment Frequency: ').parent().next().should('include.text', frequency)
            cy.contains('Initial Amortization Period: ').parent().next().should('exist')
            cy.contains('Payments Displayed: ').parent().next().should('exist')
        })
      
    }
}