// Imports functions in other files //]
import { ExtactNumbers } from "./Extract.js";

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
const targetNum = Number(day + month) + 11;

// The numbers that it is allowed to use //
const nums = [ 1331, 2025, 8, 6, 2, 47, 1000 ];

// Runs the computation on a different thread //
const worker = new Worker('scripts/Worker.js');
worker.onmessage = function(e)
{
    // Displays the simple operation to the webpage //
    document.getElementById('math-proof').textContent = e.data + " = " + targetNum;

    // Extracts the numbers into their array //
    const numbers = ExtactNumbers(e.data);

    // Adds a list element to the 'math-div' with each of the numbers //
    const container = document.getElementById('math-div');
    const list = document.createElement('ul');

    numbers.forEach(item =>
    {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });

    container.appendChild(list);

    console.log(numbers);

}
worker.postMessage({ nums, targetNum });
