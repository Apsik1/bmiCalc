/// <reference types="cypress" />

import averageBMI from '../../fixtures/averageBMI.json'
import CalculatorPage from '../../../pageObject/CalculatorPage'
const calculator = new CalculatorPage()

context('Automatic testing', () => {
    describe('Automatic testing of the Calculator aplication', () => {
        beforeEach(()=>{
            cy.visit('localhost:8080')
        })
        it('Test 1', () => {
            cy.get('.title').should('contain', 'Kalkulator BMI');
        });
        it('Test 2', () =>{
            calculator.getInputWaga().type('39');
            cy.get('.wzrost').type('170');
            cy.get('.przycisk').click();
            cy.on('window:alert',(text)=>{
                expect(text).to.contains('Podana waga jest nieprawidłowa (40kg - 200kg)');
            });
        });
        it('Test 3', () =>{
            cy.get('.waga').type('201');
            cy.get('.wzrost').type('170');
            cy.get('.przycisk').click();
            cy.on('window:alert',(text)=>{
                expect(text).to.contains('Podana waga jest nieprawidłowa (40kg - 200kg)');
            });
        });
        it('Test 4', () =>{
            cy.get('.waga').type('40');
            cy.get('.wzrost').type('170');
            cy.get('.przycisk').click();
            cy.get('#wynik').should('contain','13.84');
        });
        it('Test 5', () =>{
            cy.get('.waga').type('40');
            cy.get('.wzrost').type('119');
            cy.get('.przycisk').click();
            cy.on('window:alert',(text)=>{
                expect(text).to.contains('Podany wzrost jest nieprawidłowy (120cm - 240cm)');
            });
        });
        it('Test 6', () =>{
            cy.get('.waga').type('40');
            cy.get('.wzrost').type('241');
            cy.get('.przycisk').click();
            cy.on('window:alert',(text)=>{
                expect(text).to.contains('Podany wzrost jest nieprawidłowy (120cm - 240cm)');
            });
        });
        it('Test 7', () =>{
            cy.get('.waga').type('40');
            cy.get('.wzrost').type('120');
            cy.get('.przycisk').click();
            cy.get('#wynik').should('contain','27.78');
        });
        it('Test 8', ()=>{
            cy.get('.przycisk').click();
            cy.get('#wynik').should('contain','NaN')
        });
        it('Test 9', ()=>{
            cy.get('.waga').type('40');
            cy.get('.wzrost').type('120');
            cy.get('.przycisk').click();
            cy.get('.waga').type('70');
            cy.get('.wzrost').type('120');
            cy.get('.przycisk').click();
            cy.get('#porownanie').should('contain','Twoje BMI wzrosło');
        });
        it('Test 10', ()=>{
            cy.fixture('averageBMI').then(averageData => {
                averageData.forEach(data => {
                    cy.get('.waga').type(data.weight);
                    cy.get('.wzrost').type(data.height);
                    cy.get('.przycisk').click();
                });
            })
            cy.get('#srednia').should('contain','46.30');
        });
    });
});
