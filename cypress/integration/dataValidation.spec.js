/// <reference types="cypress" />
import {homePage, interactivePage} from '../pages/index';
import  { mortgage } from '../utils/test_data'

const AMORTYEAR = 'input[name="AMNEWY"]'
const SAVING = 'input[name="AMINTSAVE"]'
const AMORTMONTH = 'input[name="AMNEWM"]'

describe('Data Validation', () => {

    beforeEach(()=>{
        cy.visit('/')
    })

    it('Data Validation Test', () => {
        const accelerated = 'No'
        //Validate landing page is displayed
        homePage.ValidateLandingPage()
        //Input test data and calculate 
        homePage.inputValues(mortgage.mortgageAmount, 
            mortgage.interestRate, 
            mortgage.mortgagePayment, 
            mortgage.paymentFrequency,
            accelerated,
            mortgage.lumpsumPayment, 
            mortgage.lumpsumPaymentPeriod, 
            mortgage.mortgagePaymentIncrease,
            mortgage.mortgagePaymentIncreasePeriod
        )  
        //validate results populated
        homePage.isResultPopulated(AMORTYEAR, AMORTMONTH, SAVING)
        //Click on compute Amortization 
        cy.intercept('GET', '/Content/**').as('compute')
        cy.get('input[value="Compute Amortization Schedule"]').click()
        cy.wait('@compute').its('response.statusCode').should('eq', 200); 
        // validate interactive Amortization schedule and inputs
        interactivePage.ValidateLandingPage()
        interactivePage.validateInputs(mortgage.mortgageAmount, 
            mortgage.interestRate, 
            mortgage.mortgagePayment, 
            mortgage.paymentFrequency
        )
        interactivePage.validateGrid()

    })

})