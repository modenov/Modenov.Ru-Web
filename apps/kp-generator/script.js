let count = 0;

function formatDate() {
const months = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
let d = new Date();
return `г. Смоленск, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} г.`;
}

function setDefaults() {
document.getElementById("citydate").value = formatDate();
}

function addRow() {
count++;
let tbody = document.querySelector("#table tbody");

let row = document.createElement("tr");
row.innerHTML = `
<td>${count}</td>
<td><input></td>
<td><input type="number" value="0" oninput="calc(this)"></td>
<td><input type="number" value="1" oninput="calc(this)"></td>
<td class="sum">0</td>
<td><button onclick="removeRow(this)">✕</button></td>
`;

tbody.appendChild(row);
}

function removeRow(btn) {
btn.closest("tr").remove();
updateNumbers();
}

function updateNumbers() {
let rows = document.querySelectorAll("#table tbody tr");
rows.forEach((row, i) => row.children[0].innerText = i+1);
count = rows.length;
}

function calc(input) {
let row = input.closest("tr");
let price = row.children[2].querySelector("input").value;
let qty = row.children[3].querySelector("input").value;
row.querySelector(".sum").innerText = price * qty;
}

function generate() {
let title = document.getElementById("title").value;
let citydate = document.getElementById("citydate").value;
let details = document.getElementById("details").value;
let text = document.getElementById("text").value;
let sign = document.getElementById("sign").value;

let rows = document.querySelectorAll("#table tbody tr");

let md = `${title}\n\n`;
md += `**${citydate}**\n\n`;
md += `${details}\n\n`;
md += `${text}\n\n`;

md += `| № | Наименование | Цена | Кол-во | Сумма |\n`;
md += `|---|--------------|------|--------|-------|\n`;

let total = 0;

rows.forEach((row, i) => {
let name = row.children[1].querySelector("input").value;
let price = row.children[2].querySelector("input").value;
let qty = row.children[3].querySelector("input").value;
let sum = price * qty;
total += sum;

md += `| ${i+1} | ${name} | ${price} | ${qty} | ${sum} |\n`;
});

md += `\n**Итого: ${total} руб.**\n\n`;
md += `${sign}`;

document.getElementById("output").value = md;
}

function copyText() {
let text = document.getElementById("output");
text.select();
document.execCommand("copy");
}

function clearAll() {
document.getElementById("output").value = "";
document.querySelector("#table tbody").innerHTML = "";
count = 0;
}

setDefaults();
