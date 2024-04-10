document.addEventListener('DOMContentLoaded', function() {
    const divButtons = document.querySelector('.buttons');

    const buttonValues = ['C','%','D','/','7', '8', '9','*', '4', '5', '6','-', '1', '2', '3','+', '0','.','√','='];
    buttonValues.forEach(value => {
        const button = document.createElement('button');
        button.textContent = value;
        button.onclick = function() {
            if (value === 'C') {
                ClearScreen();
            } else if (value === '=') {
                equal();
            } else if (value === 'D') {
                deleteLast();
            } else {
                appendToScreen(value);
            }
        };
        divButtons.appendChild(button);
    });
});

function percent() {
    const currentValue = parseFloat(document.getElementById('textbox').value);
    const percentValue = currentValue / 100;
    document.getElementById('textbox').value = percentValue;
}

function calculateSquareRoot() {
    const inputValue = parseFloat(document.getElementById('textbox').value);

    if (!isNaN(inputValue) && inputValue >= 0) {
        const squareRoot = Math.sqrt(inputValue);
        document.getElementById('textbox').value = squareRoot;
    } else {
        alert('Invalid input for square root calculation.');
        ClearScreen();
    }
}

function appendToScreen(value) {
    document.getElementById('textbox').value += value;
}

function ClearScreen() {
    document.getElementById('textbox').value = '';
}

function deleteLast() {
    const currentText = document.getElementById('textbox').value;
    document.getElementById('textbox').value = currentText.slice(0, -1);
}

function equal() {
    try {
        const result = eval(document.getElementById('textbox').value);
        if (!isFinite(result) || isNaN(result)) {
            throw new Error('Invalid Calculation');
        }
        document.getElementById('textbox').value = result;
    } catch (error) {
        console.error(error.name); 
        alert(error.name); 
        ClearScreen();
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key === 'Enter') {
        event.preventDefault();
        equal();
    } else if (key === 'c') {
        ClearScreen();
    } else if (key === 'Delete') {
        deleteLast();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 's') {
        calculateSquareRoot() 
    } else if (key === 'p') {
        percent();
    } else if (!isNaN(key) || key === '.' || ['+', '-', '*', '/'].includes(key)) {
        appendToScreen(key);
    }
});
