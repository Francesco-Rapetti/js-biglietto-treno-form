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

let inputs = [nome, km, eta]
for (let index = 0; index < inputs.length; index++) {
    inputs[index].addEventListener('input', function() {
        // enable buttons if fields are filled
        if (nome.value != "" && km.value != "" && eta.value != "none") {
            btn1.classList.remove("disabled");
            btn2.classList.remove("disabled");
        } else if (!("disabled" in btn1.classList && "disabled" in btn2.classList)) {
            message.innerHTML = "Ha funzionato!";
            btn1.classList.add("disabled");
            btn2.classList.add("disabled");
        }
    })
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
    btn1.classList.add('disabled');
    btn2.classList.add('disabled');
    message.className = "d-none";
})


console.log(nome.value);
console.log(kilometri.value);
console.log(eta.value);




// returns percentage
function percentageCalculator(num, percentage) {
    return (num / 100) * percentage;
}