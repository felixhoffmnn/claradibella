//codice per mostrare immagini e testo all'hover
// function imageReveal(textClass) {

//   document.addEventListener("mousemove", (e) => {
//       var x = e.clientX;
//       //var y = e.clientY;

//        //imgClass.style.left = `${x + 100}px`;
//        textClass.style.left = `${x + 500}px`;
//        //myClass.style.top = `${y + 50}px`;

//       });
//   }

function imageReveal(textClass) {
  document.addEventListener("mousemove", (e) => {
    var x = e.clientX;

    // Imposta la posizione a 0px se la larghezza della finestra è inferiore a 768px
    const isMobile = window.innerWidth < 768;
    const positionX = isMobile ? 150 : x + 500;

    textClass.style.left = `${positionX}px`;
  });
}

//codice per blurrare e nascondere il nome quando scrolli
let isScrollEnabled = true;

window.addEventListener("scroll", function () {
  if (!isScrollEnabled) {
    return; // uscita immediata se lo scroll è disabilitato
  }

  let num = (window.scrollY / window.innerHeight) * 10;
  let opacity = 1 - window.scrollY / 500;

  this.document.getElementById("name").style.opacity = opacity;
  this.document.getElementById("name").style.filter = `blur(${num}px)`;

  if (window.scrollY >= 1000) {
    isScrollEnabled = false;
  }
});

window.addEventListener("scroll", function () {
  if (isScrollEnabled && window.scrollY < 1000) {
    isScrollEnabled = true;
  }
});

//fine codice per blurrare e nascondere il nome quando scrolli

//codice per scramble text
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

const textScrambleElems = document.querySelector(".text-scramble");

if (textScrambleElems) {
  const fx = new TextScramble(textScrambleElems);
  const phrases = [
    "Visual designer",
    "Front-end nerd",
    "Interaction design student",
    "Troublemaker",
    "UX/UI lover",
  ];
  let counter = 0;
  const next = () => {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1500);
    });
    counter = (counter + 1) % phrases.length;
  };

  next();
} else {
  console.log("L'elemento con id 'text-scramble' non è stato trovato");
}

//fine codice per scramble text

// When the user scrolls down 50px from the top of the document, resize the header's font size
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    document.getElementById("about").style.filter = `blur(2px)`;
  } else {
    document.getElementById("about").style.filter = `blur(0px)`;
  }
}

const aboutElem = document.getElementById("about");

aboutElem.addEventListener("mouseover", function () {
  aboutElem.style.filter = `blur(0px)`;
});

aboutElem.addEventListener("mouseout", function () {
  // torna al valore di filtro precedentemente impostato in base allo scroll
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    aboutElem.style.filter = `blur(2px)`;
  } else {
    aboutElem.style.filter = `blur(0px)`;
  }
});
//fine codice per blurrare about allo scroll

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

// per scrollare da works
function scrollToSection() {
  const section = document.getElementById("proj-container");
  section.scrollIntoView({ behavior: "smooth" });
}
