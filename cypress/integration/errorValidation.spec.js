/// <reference types="cypress" />
import {homePage, interactivePage} from '../pages/index';
import  { mortgage } from '../utils/test_data'


describe('Error Validation', () => {

    before(()=>{
        cy.visit('/')
    })

    it('Error Validation Test', () => {
        const accelerated = 'Yes'
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

    })

})