// Imports other functions //
import { FindExpression } from "./FindExpression.js";

// Gets tommorows date //
const today = new Date();
const tommorow = new Date();
tommorow.setDate(today.getDate() + 1);

// Formats the date and outputs it to the webpage //
const formattedDate = tommorow.toLocaleDateString();
document.getElementById('date').textContent = formattedDate;

// Gets the date shortend as a number //
const day = tommorow.getDate().toString().padStart(2, '0');
const month = tommorow.getMonth().toString().padStart(2, '0');
const targetNum = Number(day + month);

// Outputs a temporay problem to the console //
const nums = [3, 8, 3, 1];
const target = 24;
document.getElementById('math-proof').textContent = FindExpression(nums, target);
