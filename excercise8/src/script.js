const display = document.getElementById("display");
const history = document.getElementById("historyDisplay");
let current = "";
let operator = "";
let previous = "";

function updateDisplay() {
  display.textContent = current || "0";
  history.textContent = previous && operator ? `${previous} ${operator}` : "";
}

function appendNumber(num) {
  if (num === "0" && current === "0") return;
  current += num;
  updateDisplay();
}

function appendDecimal() {
  if (!current.includes(".")) {
    current += current ? "." : "0.";
    updateDisplay();
  }
}

function appendOperator(op) {
  if (!current) return;
  if (previous && operator) {
    calculate();
  } else {
    previous = current;
    current = "";
  }
  operator = op;
  updateDisplay();
}

function calculate() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return;

  let result;
  switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "×": result = a * b; break;
    case "÷": result = b !== 0 ? a / b : "Error"; break;
    case "%": result = a % b; break;
    default: return;
  }

  current = result.toString();
  previous = "";
  operator = "";
  updateDisplay();
}

function clearDisplay() {
  current = "";
  previous = "";
  operator = "";
  updateDisplay();
}

function toggleSign() {
  if (!current) return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
  updateDisplay();
}

