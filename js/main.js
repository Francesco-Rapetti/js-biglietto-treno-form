let nome = document.getElementById("name-surname");
let kilometri = document.getElementById('km');
let eta = document.getElementById('age');
let btn1 = document.querySelector("#generate");
let btn2 = document.getElementById("abort");
const prezzoAlKm = 0.21;
let prezzo;
let sconto;
let message = document.getElementById('message');
let ticket = document.getElementById('ticket');

if (nome.value != null && nome.value != undefined && nome.value != "" &&
    km.value != null && km.value != undefined && km.value != "" &&
    eta.value != "none") {
    btn1.classList.remove("disabled");
    btn2.classList.remove("disabled");
}

btn1.addEventListener("click", function() {
    switch (eta.value) {
        case 'minor': sconto = 20; break;
        case 'major': sconto = 0; break;
        case 'over65': sconto = 40; break;
    }
    message.innerHTML = nome.value + kilometri.value + eta.value + sconto;
    message.className = "d-block";
});

btn2.addEventListener("click", function() {
    nome.value = '';
    kilometri.value = '';
    eta.value = 'none';
    message.className = "d-none";
})


// console.log(message.value);

console.log(nome.value);
console.log(kilometri.value);
console.log(eta.value);

// checks if there are char in the string
function numberController(input) {
    for (let index = 0; index < input.length; index++) {
        if (isNaN(input[index])) {
            return false;
        }
    }
    return true;
}

// returns percentage
function percentageCalculator(num, percentage) {
    return (num / 100) * percentage;
}