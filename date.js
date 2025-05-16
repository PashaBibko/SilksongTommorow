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
const tagretNum = Number(day + month);

// Outputs it to the console (temp) //
console.log(tagretNum);
