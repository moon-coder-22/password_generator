const params = {
  bigLetters: true,
  smallLetters: true,
  numbers: true,
  specialsChars: false,
};

let paswLength;

var rangeslider = document.getElementById("sliderRange");
var output = document.getElementById("value");
output.innerHTML = rangeslider.value;
paswLength = rangeslider.value;

const input = document.getElementById("password");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");

// initial password generating
generatePassword(params);

generateBtn.addEventListener("click", () => {
  generatePassword(params);
});

copyBtn.addEventListener("click", copyToClipboard);
let paramBtns = document.querySelectorAll(".param-btn");

paramBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    switchBtn(e.target);
  })
);

rangeslider.oninput = function() {
  output.innerHTML = this.value;
  paswLength = this.value;
  generatePassword(params);
}

function switchBtn(btn) {
  let btnIsEnabled = btn.getAttribute("data-is-enabled");
  let btnId = btn.id;

  if (btnIsEnabled == "true") {
    params[btnId] = false;
    btn.classList.remove("param-btn-enabled");
    btn.setAttribute("data-is-enabled", false);
  } else {
    params[btnId] = true;
    btn.classList.add("param-btn-enabled");
    btn.setAttribute("data-is-enabled", true);
  }
  generatePassword(params);
};

function generatePassword(params) {
  let allSymbols = [];
  let password = "";

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const bigLetters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  const smallLetters = bigLetters.map((e) => e.toLocaleLowerCase());
  const specialsChars = "_!#%*()/*-=+&@\^".split('');

  let charSet = {
    numbers,
    bigLetters,
    smallLetters,
    specialsChars,
  };

    // checking parameters
    // and adding choosen char sets to password
  let keys = Object.keys(charSet);
  keys.forEach((key) => {
    if (params[key] == true) {
      allSymbols = [...allSymbols, ...charSet[key]];
    }
  });

  // generate password
  for (let i = 0; i < paswLength; i++) {

    let char = randomizeAll(allSymbols)[randomFromZeroToMax(allSymbols.length - 1)];
    password += char;
  }

  if(allSymbols.length !== 0) {
   renderResult(password);
  }
}

async function copyToClipboard() {
  try {
    navigator.clipboard.writeText(input.value);
    var tooltip = document.getElementById("tooltip");
    tooltip.innerText = "Password copied";
  } catch (e) {
    console.log("Error:", e);
  }
}

function outFunc() {
  let tooltip = document.getElementById("tooltip");
  tooltip.innerText = "Copy to clipboard";
}
// randomize all elements in array
function randomizeAll(arr) {
  return arr.sort(() => Math.random() - 0.5); 
}

function randomFromZeroToMax(max) {
  return Math.round(Math.random() * max);
}

function renderResult(password) {
  input.value = password;
}


