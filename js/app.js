//declarar un array que represente los asientos del avión con flase, indicando que están vacios

var airlineSeats = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false
];

//contador que nos ayudará a rastrear el número de asientos ocupados

var busySeats = 0;

var paintSeats = function(array) {
    var containerSeats = document.getElementById("seats");

    for (var i = 0; i < array.length; i++) {
        var seat = document.createElement("div");
        seat.className = "seats";

        //del primer elemento al cuarto, en nuestro arreglo va a ser primera clase (del indice 0 al 3)
        if (i < 4) {
            seat.style.background = "purple";
        } else {
            seat.style.background = "yellow";
        }
        containerSeats.appendChild(seat);
    }

};

var reserve = function() {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", chooseZone);
};

var chooseZone = function() {
    var choice = prompt("En qué zona prefieres reservar \n 1. Primera Clase \n 2. Económica \n \n Por favor ingresa el número de tu preferenciaa")
    if (choice == 1) {
        checkFirstClassZone();
    } else if (choice == 2) {
        checkEconomicZone();
    } else {
        alert("Por favor ingresa un número válido")
    }
};

var checkFirstClassZone = function(params) {
    var zone = "Primera Clase";
    //recorre del elemento 0 al 3 y verifica cuales están disponibles
    for (var i = 0; i < 4; i++) {
        if (airlineSeats[i] == false) {
            airlineSeats[i] = true;
            reserveSeat(i);
            paintTicket(i, zone);
            busySeats++;
            //al reserar un asiento no necesitamos seguir recorriendo nuestro arreglo, por tanto rompemos el for con el break
            break;
        } else if (i == 3 && airlineSeats[i] == true) {
            reasignEconomicZone(zone);
        }
    }
};

var checkEconomicZone = function(params) {
    var zone = "Económica";
    for (var i = 4; i < 10; i++) {
        if (airlineSeats[i] == false) {
            airlineSeats[i] = true;
            reserveSeat(i);
            paintTicket(i, zone);
            busySeats++;
            break;
        } else if (i == 9 && airlineSeats[i] == true) {
            reasignFirstClassZone(zone)
        }
    }
};

var reserveSeat = function(indexToPoint) {
    var seat = document.getElementsByClassName("seats");
    seat[indexToPoint].textContent = "Ocupado";
};

var reasignEconomicZone = function(zone) {
    if (busySeats == 10) {
        noSeats();
        nextFlight();
    } else {
        var reasign = confirm("Ya no quedan asientos disponibles en " + zone + " :( \n ¿Quieres reservar en zona económica?");
        if (reasign == true) {
            checkEconomicZone();
        } else {
            nextFlight();
        }
    }
};

var reasignFirstClassZone = function(zone) {
    if (busySeats == 10) {
        noSeats();
        nextFlight();
    } else {
        var reasign = confirm("Ya no quedan asientos disponibles en " + zone + " :( \n ¿Quieres reservar en Primera Clase?");
        if (reasign == true) {
            checkFirtClassZone();
        } else {
            nextFlight();
        }
    }
};

var paintTicket = function(index, zone) {
    var containerTickets = document.getElementById("ticket");
    var ticket = document.createElement("div");
    ticket.className = "seats";
    var title = document.createElement("p");
    var reservedSeating = document.createElement("p");
    var zoneClass = document.createElement("p");
    title.textContent = "PASE DE ABORDAR";
    reservedSeating.textContent = "No. de asiento: " + (index + 1);
    zoneClass.textContent = zone;
    ticket.appendChild(title);
    ticket.appendChild(reservedSeating);
    ticket.appendChild(zoneClass);
    containerTickets.appendChild(ticket);
};

var nextFlight = function() {
    alert("Nuestro próximo vuelo sale en 3 horas")
};

var noSeats = function() {
    alert("Lo sentimos \n Ya no quedan asientos disponibles en este avión")
}

paintSeats(airlineSeats);
reserve();