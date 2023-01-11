// DOM elements
    // 1. Display
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
    //  2. Buttons
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-equals]');

// constructor
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        
        this.allClear();
    }

    allClear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    deleteDigit() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendDigit(digit) {
        // reject inputs that render the operand invalid (multiple decimal points)
        if ( digit === '.' && this.currentOperand.includes('.')) return;
        
        // if digit is zero, do not allow multiple initial zeroes
        if ( digit === '0' && this.currentOperand === '0' ) return;

        // if digit is '.' and there are no prior digits, add a zero
        if ( digit === '.' && this.currentOperand === '' ) this.currentOperand = '0';

        // clean unnecessary zeroes when appending
        this.currentOperand += digit;
    }

    selectOperation(operation) {
        if (this.currentOperand === '' && operation === '-') {
            this.appendDigit(operation);
            return;
        } 

        if (this.currentOperand === '') return;

        if (this.previousOperand !== '') this.calculate();
        
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if (isNaN(prev) || isNaN(current)) return;
        /* if (!isNan(prev) && current === 0)  return; */

        switch (this.operation) {
        case '÷':
            result = prev / current;
            break;
        case '*':
            result = prev * current;
            break;
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        default:
            return
        }

        this.currentOperand = result.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand;
        if (this.operation !== undefined) {
            this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

} /* class Calculator */

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// event listeners: buttons
allClearButton.addEventListener('click', button => {
    calculator.allClear(); 
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.deleteDigit();
    calculator.updateDisplay();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendDigit(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
})

// event listeners: keyboard
window.addEventListener('keyup', (e) => {
    console.log(e.key);
    switch (e.key) {
        case 'Escape':
            calculator.allClear(); 
            break;
        case 'Backspace':
        case 'Delete':
            calculator.deleteDigit();
            break;
        case '1': case '2': case '3': case '4': case '5': 
        case '6': case '7': case '8': case '9': case '.': case '0':
            calculator.appendDigit(e.key);
            break;
        case '/': 
            calculator.selectOperation('÷');
            break;
        case '*': case '+': case '-': 
            calculator.selectOperation(e.key);
            break;
        case '=':
        case 'Enter':
            calculator.calculate();
            break;
            default:
                break
        }
        calculator.updateDisplay();
        })




