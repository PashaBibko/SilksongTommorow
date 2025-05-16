// Gets tommorows date //
const today = new Date();
const tommorow = new Date();
tommorow.setDate(today.getDate() + 1);

// Formats the date and outputs it to the webpage //
const formattedDate = tommorow.toLocaleDateString();
document.getElementById('date').textContent = formattedDate;
