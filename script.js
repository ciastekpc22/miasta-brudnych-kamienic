const sheetId = "1ywr6P85D2mcCLzH2V0XXEc7JvQOOevwIn67UjEuE2Z4";
const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

let data = [];

async function fetchSheet() {
  const res = await fetch(sheetUrl);
  const text = await res.text();
  // Google wraps JSON in a callback, need to extract it
  const json = JSON.parse(text.substring(text.indexOf("(") + 1, text.lastIndexOf(")")));
  const rows = json.table.rows;
  
  data = rows.map(r => {
    return {
      text: r.c[0] ? r.c[0].v : "",
      tags: r.c[1] ? r.c[1].v.split(",").map(s => s.trim()) : [],
      length: r.c[0] ? r.c[0].v.length : 0
    };
  });
  
  renderList(data);
}

function renderList(list) {
  const ul = document.getElementById("results");
  ul.innerHTML = "";
  list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.text;
    ul.appendChild(li);
  });
}

function filter() {
  const search = document.getElementById("search").value.toLowerCase();
  const minLength = parseInt(document.getElementById("minLength").value, 10) || 0;
  
  const filtered = data.filter(item => {
    const matchesText = item.text.toLowerCase().includes(search);
    const matchesLength = item.length >= minLength;
    return matchesText && matchesLength;
  });
  
  renderList(filtered);
}

function showRandom() {
  if (!data.length) return;
  const idx = Math.floor(Math.random() * data.length);
  const item = data[idx];
  alert(item.text);
}

document.getElementById("search").addEventListener("input", filter);
document.getElementById("minLength").addEventListener("input", filter);
document.getElementById("randomBtn").addEventListener("click", showRandom);

fetchSheet();
