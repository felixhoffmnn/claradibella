// Funzione per osservare l'entrata dell'immagine nel viewport
const revealOnScroll = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const container = img.parentElement;

        // Trova tutte le immagini nella stessa riga (nella stessa classe di colonne, ad esempio col-3p)
        const imagesInRow = Array.from(container.parentElement.children);

        // Trova la posizione dell'immagine corrente nella riga
        const position = imagesInRow.indexOf(container);

        // Calcola un ritardo progressivo: ad esempio 0.3s per ogni posizione
        const delay = (position / 2) * 0.2; // Modifica 0.3s per un ritardo maggiore o minore

        // Imposta il ritardo su maschera e immagine
        img.style.transitionDelay = `${delay}s`;
        const mask = container.querySelector(".reveal-mask");
        if (mask) {
          mask.style.transitionDelay = `${delay}s`;
        }

        // Aggiungi la classe per far apparire l'immagine e rimuovere la maschera
        img.classList.add("visible");
        observer.unobserve(entry.target); // Una volta rivelato, smetti di osservare
      }
    });
  },
  { threshold: 0.2 } // 0.2 significa che il 20% dell'elemento deve essere visibile
);

// Seleziona tutte le immagini con la classe reveal-image
document.querySelectorAll(".reveal-image").forEach((image) => {
  revealOnScroll.observe(image);
});

// Seleziona tutte le immagini con la classe reveal-image
document.querySelectorAll(".reveal-image").forEach((image) => {
  revealOnScroll.observe(image);
});

//CODICE PER DEBLURRARE ALLO SCROLL
const observer = lozad(".lozad", {
  rootMargin: "50px 0px", // margine root per il controllo dell'area di visualizzazione dell'immagine
  threshold: 0.1, // soglia di visibilità dell'immagine
  loaded: function (el) {
    // funzione richiamata quando l'immagine è stata caricata
    el.classList.add("blur-down");
    el.style.opacity = 1;
  },
});
observer.observe();
//fine codice per deblurrare immagini allo scroll

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("header").outerHeight();

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $("header").removeClass("nav-down").addClass("nav-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("header").removeClass("nav-up").addClass("nav-down");
    }
  }

  lastScrollTop = st;
}
//fine hide header on scroll down
