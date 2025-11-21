// example database – later we can connect it to Google Sheets
const database = [
  "example entry",
  "another sample",
  "something else",
  "test phrase"
];

const resultsList = document.getElementById("results");
const searchInput = document.getElementById("search");
const minLengthInput = document.getElementById("minLength");
const randomBtn = document.getElementById("randomBtn");

// render full list on load
renderList(database);

function renderList(list) {
  resultsList.innerHTML = "";
  list.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    resultsList.appendChild(li);
  });
}

// live search
searchInput.addEventListener("input", () => {
  updateFiltered();
});

minLengthInput.addEventListener("input", () => {
  updateFiltered();
});

function updateFiltered() {
  const phrase = searchInput.value.toLowerCase();
  const minLen = Number(minLengthInput.value) || 0;

  const filtered = database.filter(item =>
    item.toLowerCase().includes(phrase) &&
    item.length >= minLen
  );

  renderList(filtered);
}

// random entry
randomBtn.addEventListener("click", () => {
  const random = database[Math.floor(Math.random() * database.length)];
  renderList([random]);
});
