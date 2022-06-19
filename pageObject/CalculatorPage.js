class CalculatorPage {
   _inputWaga = '.waga'
   getInputWaga(){
       return cy.get(this._inputWaga)
   }
}
export default CalculatorPage