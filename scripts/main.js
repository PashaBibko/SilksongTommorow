// Imports functions in other files //]
import { ExtractNumbers, FormatExpression } from "./Util.js";

// The number map //
const numberMap = new Map();
numberMap.set(1331, "u/E1331");
numberMap.set(2025, "Year that silksong (should) release");
numberMap.set(15  , "Amount of areas in Hollow knight");
numberMap.set(6   , "The average amount of years a r/Silksong member has spent in a psych-hospital");
numberMap.set(2   , "Number of games Team Cherry has released");
numberMap.set(47  , "Number of charms in Hollow knight");
numberMap.set(1000, "What I would rate Zote out of 10");
numberMap.set(63  , "The amount of achievements in Hollow Knight");

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

// The numbers that it is allowed to use //
const nums = Array.from(numberMap.keys());

// Runs the computation on a different thread //
const worker = new Worker('scripts/Worker.js');
worker.onmessage = function(e)
{
    // Extracts the numbers into their array //
    const numbers = ExtractNumbers(e.data);
    if (numbers.length === 0)
    {
        document.getElementById('math-proof-text').textContent = e.data;
        return;
    }

    // Displays the simple operation to the webpage //
    document.getElementById('math-proof-text').textContent = "Tomorrow's date is " + day + "/" + month + " and: ";
    document.getElementById('math-proof').textContent = FormatExpression(e.data) + " = " + targetNum;

    // Adds a list element to the 'math-div' //
    const container = document.getElementById('table-insert-point');
    const table = document.createElement('table');
    table.className = "num-table";
    container.appendChild(table);

    // Adds each number to the list //
    numbers.forEach(item =>
    {
        // Creates a row to store the info //
        const row = document.createElement("tr");

        // Stores the number //
        const numCell = document.createElement("td");
        numCell.textContent = item;
        row.appendChild(numCell);

        // Stores why the number is relevant //
        const strCell = document.createElement("td");
        strCell.textContent = " = " + numberMap.get(item);
        row.appendChild(strCell);

        // Adds the row to the table //
        table.appendChild(row);
    });

    // Replace each number with it's map equivelant //
    document.getElementById('math-explanation').textContent = "Which means: " + FormatExpression(e.data).replace(/\b\d+\b/g, (match) =>
    {
        const num = Number(match);
        return numberMap.get(num) ?? match;
    }) + " = tomorrows date";
}

worker.postMessage({ nums, targetNum });
