const nome = document.getElementById("name-surname");
const kilometri = document.getElementById('km');
const eta = document.getElementById('age');
const btn1 = document.querySelector("#generate");
const btn2 = document.getElementById("abort");
const prezzoAlKm = 0.21;
const letters = [' ', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let prezzo;
let sconto = 0;
let md = window.matchMedia("(min-width: 768px)")
let lg = window.matchMedia("(min-width: 993px)")
const glass = document.getElementById('glass');
const ticket = document.getElementById('ticket');
const ticketName = document.getElementById('ticket-name');
const ticketOffer = document.getElementById('ticket-offer');
const ticketCarriage = document.getElementById('ticket-carriage');
const ticketCP = document.getElementById('ticket-cp');
const ticketPrice = document.getElementById('ticket-price');
const ticketPriceDiscounted = document.getElementById('ticket-price-discounted');

// enable/disable buttons
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

// "Genera" button
btn1.addEventListener("click", function() {
    if (!nameValidator(nome.value)) {
        alert("Nome non valido");
        nome.value = '';
        btn1.classList.add('disabled');
    } else {
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
    
        console.log(sconto);
    
        if (sconto > 0) {
            ticketPriceDiscounted.classList.remove('d-none');
            ticketPriceDiscounted.innerHTML = `${priceCalculator(true)}&euro;`;
            ticketPrice.classList.add('barred');
            ticketPrice.innerHTML = `${priceCalculator(false)}&euro;`
        } else {
            ticketPriceDiscounted.classList.add('d-none');
            ticketPrice.classList.remove('barred');
            ticketPrice.innerHTML = `${priceCalculator(true)}&euro;`
        }
    
        ticket.classList.remove('d-none');
        ticketName.innerHTML = prettier(nome.value);
        ticketCarriage.innerHTML = Math.floor(Math.random() * 9) + 1;
        ticketCP.innerHTML = Math.floor(Math.random() * (100000 - 10000) ) + 10000;
        btn1.classList.add('disabled');
    }
});

// "Annulla" button
btn2.addEventListener("click", function() {
    ticket.classList.add('d-none');
    nome.value = '';
    kilometri.value = '';
    eta.value = 'none';
    btn1.classList.add('disabled');
    btn2.classList.add('disabled');
})

// check if name is valid
function nameValidator(name) {
    for (let i = 0; i < name.length; i++) {
        if (!(letters.includes(name[i]))) {
            return false;
        }
    }
    return true;
}

// returns discounted price if true and standard if false
function priceCalculator(discount) {
    if (discount) {
        return ((km.value * prezzoAlKm) - percentageCalculator((km.value*prezzoAlKm), sconto)).toFixed(2);
    } else {
        return (km.value * prezzoAlKm).toFixed(2);
    }
}

// first letter upper case
function prettier(name) {
    name.toLowerCase();
    let indexes = [0];
    for (let i = 0; i < name.length; i++) {
        if (name[i] == ' ' && i != name.length-1 && name[i+1] != ' ') {
            indexes.push(i+1);
        }
    }
    let output = '';
    for (let i = 0; i < indexes.length; i++) {
        output += name[indexes[i]].toUpperCase() + name.substring(indexes[i]+1, indexes[i+1])
    }
    return output;
}

// returns percentage
function percentageCalculator(num, percentage) {
    return (num / 100) * percentage;
}