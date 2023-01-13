// DOM elements
    // 1. Display
const displayBG = document.querySelector('.display');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
    //  2. Buttons
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const allButtons = [allClearButton, 
                    deleteButton, 
                    ...numberButtons, 
                    ...operatorButtons, 
                    equalsButton];


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

        displayBG.classList.add('flash');
        setTimeout(() => { displayBG.classList.remove('flash') }, 200);
    }

    deleteDigit() {
        this.currentOperand = this.currentOperand.slice(0, -1);
    }

    appendDigit(digit) {
        // reject inputs that render the operand invalid (multiple decimal points)
        if ( digit === '.' && this.currentOperand.includes('.')) return;
        
        // if digit is zero, do not allow multiple initial zeroes
        if ( digit === '0' && this.currentOperand === '0' ) return;

        // if digit is zero and a number is added, remove the zero
        if ( this.currentOperand === '0' && digit !== '0' && digit != '.') {
            this.currentOperand = '';
        }

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
        this.currentOperandTextElement.innerText = this.formatAsNumber(this.currentOperand);
        if (this.operation !== undefined) {
            this.previousOperandTextElement.innerText = `${this.formatAsNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    formatAsNumber(numberAsString) {
        if (numberAsString === '') return '0';
        
        let formattedString = '';
        const integerDigits = parseFloat(numberAsString.split('.')[0]);
        const decimalDigitsAsString = numberAsString.split('.')[1];

        if (decimalDigitsAsString === undefined) {
            formattedString = integerDigits.toLocaleString('en-us');
        } else {
            formattedString = `${integerDigits.toLocaleString('en-us')}.${decimalDigitsAsString}`;
        }

        return formattedString;
    }

    animateButton(buttonValue) {
        const buttonPressed = allButtons.find(button => button.innerText === buttonValue );

        buttonPressed.classList.add('key-pressed');
        setTimeout(() => { buttonPressed.classList.remove('key-pressed') }, 200);
    }

} /* END class Calculator */

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
    switch (e.key) {
        case 'Escape':
            calculator.allClear(); 
            calculator.animateButton('AC');
            break;
        case 'Backspace':
        case 'Delete':
            calculator.deleteDigit();
            calculator.animateButton('DEL');
            break;
        case '1': case '2': case '3': case '4': case '5': 
        case '6': case '7': case '8': case '9': case '.': case '0':
            calculator.appendDigit(e.key);
            calculator.animateButton(e.key);
            break;
        case '/': 
            calculator.selectOperation('÷');
            calculator.animateButton('÷');
            break;
        case '*': case '+': case '-': 
            calculator.selectOperation(e.key);
            calculator.animateButton(e.key);
            break;
        case '=':
        case 'Enter':
            calculator.calculate();
            calculator.animateButton('=');
            break;
        default:
            return;
        }
        calculator.updateDisplay();
})






