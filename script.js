/* --- script.js - Mózg całej strony --- */

// 1. ZARZĄDZANIE MOTYWEM (Działa na każdej stronie)
// Sprawdź pamięć od razu po załadowaniu
if (localStorage.getItem("czyCiemny") === "tak") {
    document.body.classList.add("ciemny-motyw");
}

function zmienMotyw() {
    document.body.classList.toggle("ciemny-motyw");
    if (document.body.classList.contains("ciemny-motyw")) {
        localStorage.setItem("czyCiemny", "tak");
    } else {
        localStorage.removeItem("czyCiemny");
    }
}

// 2. EFEKT PISANIA NA MASZYNIE (Tylko dla strony głównej)
const elementTekstu = document.getElementById("tekst-pisany");
// Sprawdzamy czy ten element istnieje, żeby nie było błędu na stronie galerii
if (elementTekstu) {
    const tekstDoNapisania = "Cześć, tu Sumin! 👋";
    let indeksLiterki = 0;

    function pisz() {
        if (indeksLiterki < tekstDoNapisania.length) {
            elementTekstu.innerHTML += tekstDoNapisania.charAt(indeksLiterki);
            indeksLiterki++;
            setTimeout(pisz, 100); 
        }
    }
    // Start po 0.5 sekundy
    setTimeout(pisz, 500);
}

// 3. GALERIA LIGHTBOX (Tylko dla galerii)
const modal = document.getElementById("modal-nakladka");
const duzeImg = document.getElementById("duze-zdjecie");
const opisTxt = document.getElementById("opis-zdjecia");

function pokazDuze(kliknieteZdjecie) {
    if (modal) { // Sprawdzamy czy modal istnieje na tej stronie
        modal.style.display = "flex";
        duzeImg.src = kliknieteZdjecie.src;
        opisTxt.innerHTML = kliknieteZdjecie.getAttribute("data-opis");
    }
}

function zamknijModal() {
    if (modal) {
        modal.style.display = "none";
    }
}

// 4. OBSŁUGA FORMULARZA (Tylko dla kontaktu)
function wyslij(event) {
    event.preventDefault(); 
    var wpisaneImie = document.getElementById("imie").value;
    document.getElementById("formularz-kontener").style.display = "none";
    document.getElementById("imie-nadawcy").innerText = wpisaneImie;
    document.getElementById("podziekowanie").style.display = "block";
}

// 5. MENU MOBILNE (Hamburger)
function pokazMenu() {
    const menu = document.getElementById("menu");
    // To działa jak przełącznik światła:
    // Jak ma klasę "otwarte", to ją zabiera. Jak nie ma, to dodaje.
    menu.classList.toggle("otwarte");
}