const rootGet = getComputedStyle(document.querySelector(':root'));
const rootSet = document.querySelector(':root');
const nome = document.getElementById("name-surname");
const kilometri = document.getElementById('km');
const eta = document.getElementById('age');
const btn1 = document.querySelector("#generate");
const btn2 = document.getElementById("abort");
const prezzoAlKm = 0.21;
let prezzo;
let sconto = 0;
let expanded = false;
let md = window.matchMedia("(min-width: 768px)")
let lg = window.matchMedia("(min-width: 993px)")
const glass = document.getElementById('glass');
const ticket = document.getElementById('ticket');
const ticketName = document.getElementById('ticket-name');
const ticketOffer = document.getElementById('ticket-offer');
const ticketCarriage = document.getElementById('ticket-carriage');
const ticketCP = document.getElementById('ticket-cp');
const ticketPrice = document.getElementById('ticket-price');

let inputs = [nome, km, eta]
for (let index = 0; index < inputs.length; index++) {
    inputs[index].addEventListener('input', function() {
        // enable buttons if fields are filled
        if (nome.value != "" && km.value != "" && eta.value != "none") {
            btn1.classList.remove("disabled");
            btn2.classList.remove("disabled");
        } else if (!("disabled" in btn1.classList && "disabled" in btn2.classList)) {
            btn1.classList.add("disabled");
            btn2.classList.add("disabled");
        }
    })
}

btn1.addEventListener("click", function() {
    switch (eta.value) {
        case 'minor': 
            sconto = 20; 
            ticketOffer.innerHTML = "Sconto minori"
            break;
        case 'major': 
            sconto = 0; 
            ticketOffer.innerHTML = "Tariffa standard"
            break;
        case 'over65': 
            sconto = 40; 
            ticketOffer.innerHTML = "Sconto over 65"
            break;
        default: console.log('età default'); break;
    }

    console.log(rootGet.getPropertyValue('--media'));
    
    // switch (rootGet.getPropertyValue('--media')) {
    //     case 'mobile': rootSet.style.setProperty('--glass-height', '1000px'); break;
    //     case 'md': rootSet.style.setProperty('--glass-height', '600px'); break;
    //     case 'lg': rootSet.style.setProperty('--glass-height', '400px'); break;
    //     default: console.log('default'); break;
    // }

    // glass.style.setProperty('max-height', '1000px')

    expanded = true;
    ticket.classList.remove('d-none');
    ticketName.innerHTML = nome.value;
    ticketCarriage.innerHTML = Math.floor(Math.random() * 9) + 1;
    ticketCP.innerHTML = Math.floor(Math.random() * (100000 - 10000) ) + 10000;
    ticketPrice.innerHTML = `${priceCalculator(true)}&euro;`
    btn1.classList.add('disabled');
});

btn2.addEventListener("click", function() {
    expanded = false;
    ticket.classList.add('d-none');
    nome.value = '';
    kilometri.value = '';
    eta.value = 'none';
    btn1.classList.add('disabled');
    btn2.classList.add('disabled');
})

// returns discounted price if true and standard if false
function priceCalculator(discount) {
    if (discount) {
        return ((km.value * prezzoAlKm) - percentageCalculator((km.value*prezzoAlKm), sconto)).toFixed(2);
    } else {
        return (km.value * prezzoAlKm).toFixed(2);
    }
}

// returns percentage
function percentageCalculator(num, percentage) {
    return (num / 100) * percentage;
}