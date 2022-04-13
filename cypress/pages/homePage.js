/// <reference types="Cypress" />


const TITLE = '#lblPageTitle'
const AMOUNT ='input[name="MORTAMT"]'
const RATE = 'input[name="RATE"]'
const MORTPAYMENT = 'input[name="MAINPAY"]'
const FREQUENCY = 'select[name="PFREQ"]'
const ACCELERATE = 'select[name="ACCSEL"]'
const LUMPSUM = 'input[name="LUMPAMT"]'
const LUMPPERIOD = 'input[name="LUMPYRS"]'
const PAYINCREASE = 'input[name="INCPAY"]'
const PAYINCREASETYPE = 'select[name="INCTYPE"]'
const INCREASEPERIOD = 'input[name="INCYEARS"]'
const CALCULATE = '#btnCalculate'
const AMORTYEAR = 'input[name="AMNEWY]'
const SAVING = 'input[name="AMINTSAVE"]'
const AMORTMONTH = 'input[name="AMNEWM"]'

export default class homePage {

    static ValidateLandingPage() {
     cy.get(TITLE).should('have.text','Prepayment Privilege Calculator')
    }

    static inputValues(price,interest,payment, frequency, accelerated, lumpsum, lsperiod, payincrease, increaseperiod ){
        if (accelerated === 'No') {
            cy.get(AMOUNT).type(price)
            cy.get(RATE).type(interest)
            cy.get(MORTPAYMENT).type(payment)
            cy.get(FREQUENCY).select(frequency).should('have.value',frequency)
            cy.get(ACCELERATE).select(accelerated).should('have.value',accelerated)
            cy.get(LUMPSUM).clear().type(lumpsum)
            cy.get(LUMPPERIOD).clear().type(lsperiod)
            cy.get(PAYINCREASE).clear().type(payincrease)
            cy.get(PAYINCREASETYPE).select('%').should('have.value','%')
            cy.get(INCREASEPERIOD).clear().type(increaseperiod)
            cy.get(CALCULATE).click()
        }
        else {
            cy.get(AMOUNT).type(price)
            cy.get(RATE).type(interest)
            cy.get(MORTPAYMENT).type(payment)
            cy.get(FREQUENCY).select(frequency).should('have.value',frequency)
            cy.get(ACCELERATE).select(accelerated)
            cy.on('window:alert', (text) => {
                expect(text).to.contains('Accelerated Payment Frequency not available for Monthly or Semi-Monthly Payment Frequency.')
            }); 
            cy.get(AMOUNT).invoke('val').should('not.be.empty')
            cy.get(RATE).invoke('val').should('not.be.empty')
            cy.get(MORTPAYMENT).invoke('val').should('not.be.empty')
            cy.get(FREQUENCY).should('have.value',frequency)
        }
        
    }

    static isResultPopulated(year, month, saving){
        const fields = [year, month, saving]
        for (let field in fields){
            cy.get(fields[field]).invoke('val').should('not.be.empty')
        }
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