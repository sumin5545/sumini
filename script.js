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

// 6. PRZYCISK WRÓĆ NA GÓRĘ
const przyciskGora = document.getElementById("przycisk-gora");

// Kiedy użytkownik przewinie w dół o 200px, pokaż przycisk
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        if(przyciskGora) przyciskGora.style.display = "block";
    } else {
        if(przyciskGora) przyciskGora.style.display = "none";
    }
};

// Funkcja kliknięcia
function wrocNaGore() {
    window.scrollTo({top: 0, behavior: 'smooth'}); // Płynne przewijanie
}

// --- 1. LICZNIK DNI NAUKI KOREAŃSKIEGO ---
function aktualizujLicznik() {
    const dataStartu = new Date(2025, 5, 9); // <-- TU WPISZ SWOJĄ DATĘ (Rok, Miesiąc-1, Dzień)
    const dzis = new Date();
    const roznica = dzis - dataStartu;
    const dni = Math.floor(roznica / (1000 * 60 * 60 * 24));

    const element = document.getElementById("licznik-dni");
    if (element) {
        element.innerText = dni;
    }
}

// --- 2. GENERATOR PŁYWAJĄCYCH NUTEK (Tylko dla strony O mnie) ---
function stworzNutke() {
    // Sprawdzamy, czy w tytule strony jest "O mnie" 
    // Jeśli nie jesteśmy na tej podstronie, funkcja natychmiast przerywa działanie
    if (!document.title.includes("O mnie")) {
        return; 
    }

    const karta = document.querySelector('.karta');
    if (!karta) return;

    const nutka = document.createElement('div');
    nutka.className = 'nutka';
    nutka.innerText = ['🎵', '🎶', '🎼', '🎹'][Math.floor(Math.random() * 4)];
    
    nutka.style.left = Math.random() * 90 + '%';
    nutka.style.bottom = '10%'; 
    
    karta.appendChild(nutka);

    setTimeout(() => {
        nutka.remove();
    }, 4000);
}

// Interwał zostawiamy, ale dzięki powyższemu "if" nie będzie robił szkód na innych stronach
setInterval(stworzNutke, 1500);

// Uruchomienie funkcji po załadowaniu strony
window.addEventListener('load', () => {
    aktualizujLicznik();
    // Twórz nową nutkę co 1.5 sekundy
    setInterval(stworzNutke, 1500);
});

function aktualizujZegarSeul() {
    const teraz = new Date();
    // Seul to strefa czasowa UTC+9
    const czasSeul = teraz.toLocaleTimeString("pl-PL", {
        timeZone: "Asia/Seoul",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    const el = document.getElementById("zegar-seul");
    if(el) el.innerText = czasSeul;
}
// Odświeżaj co sekundę
setInterval(aktualizujZegarSeul, 1000);
aktualizujZegarSeul();

// --- POPRAWIONA OBSŁUGA EKRANU ŁADOWANIA ---
function ukryjLoader() {
    const loader = document.getElementById('loader-wrapper');
    if (loader && !loader.classList.contains('loader-hidden')) {
        loader.classList.add('loader-hidden');
    }
}

// 1. Próba ukrycia po pełnym załadowaniu (standardowa)
window.addEventListener('load', ukryjLoader);

// 2. TIMER BEZPIECZEŃSTWA (na wypadek problemów ze Spotify)
// Jeśli po 3 sekundach ekran wciąż wisi - usuwamy go na siłę
setTimeout(ukryjLoader, 3000);

// --- PODŚWIETLANIE MENU "PASJE" ---
document.addEventListener("DOMContentLoaded", function() {
    const linkiPasji = ['gaming.html', 'korea.html', 'muzyka.html'];
    const sciezka = window.location.pathname;
    const przyciskPasje = document.querySelector('.dropbtn');

    // Sprawdź, czy aktualna strona pasuje do listy pasji
    const czyToPasja = linkiPasji.some(link => sciezka.includes(link));

    if (czyToPasja && przyciskPasje) {
        przyciskPasje.classList.add('aktywny');
    }
});