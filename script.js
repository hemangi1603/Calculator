document.addEventListener('DOMContentLoaded', function () {
    const currentOperationDisplay = document.getElementById('current-operation');
    const resultDisplay = document.getElementById('result');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '';
    let operator = null;
    let firstOperand = null;
  
    buttons.forEach(button => {
      button.addEventListener('click', function () {
        const value = button.getAttribute('data-num') || button.getAttribute('data-op') || button.id;
  
        if (value === 'clear') {
          currentInput = '';
          operator = null;
          firstOperand = null;
          currentOperationDisplay.textContent = '';
          resultDisplay.textContent = '0';
        } else if (value === 'equals') {
          if (operator && firstOperand !== null && currentInput !== '') {
            const secondOperand = parseFloat(currentInput);
            const result = evaluate(firstOperand, operator, secondOperand);
            currentOperationDisplay.textContent = `${firstOperand} ${operator} ${secondOperand}`;
            resultDisplay.textContent = result;
            firstOperand = null;
            operator = null;
            currentInput = '';
          }
        } else if (['+', '-', '*', '/'].includes(value)) {
          if (currentInput !== '') {
            firstOperand = parseFloat(currentInput);
            operator = value;
            currentInput = '';
            currentOperationDisplay.textContent = `${firstOperand} ${operator}`;
            resultDisplay.textContent = `${firstOperand} ${operator}`;
          }
        } else {
          currentInput += value;
          if (operator) {
            currentOperationDisplay.textContent = `${firstOperand} ${operator} ${currentInput}`;
          } else {
            currentOperationDisplay.textContent = currentInput;
          }
          resultDisplay.textContent = currentOperationDisplay.textContent;
        }
      });
    });
  
    function evaluate(operand1, operator, operand2) {
      switch (operator) {
        case '+': return operand1 + operand2;
        case '-': return operand1 - operand2;
        case '*': return operand1 * operand2;
        case '/': return operand1 / operand2;
        default: return operand2;
      }
    }
  });
  