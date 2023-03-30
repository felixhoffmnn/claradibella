//codice per deblurrare le immagini allo scroll
const observer = lozad('.lozad', {
  rootMargin: '50px 0px', // margine root per il controllo dell'area di visualizzazione dell'immagine
  threshold: 0.1, // soglia di visibilità dell'immagine
  loaded: function(el) { // funzione richiamata quando l'immagine è stata caricata
    el.classList.add('blur-down');
    el.style.opacity = 1;
  }
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


const textScrambleElems = document.querySelectorAll("[class*=text-scramble]");

if (textScrambleElems) {
  var fxArr = [];
  var phrasesArr = [    ['Previous project', 'Mermaid'],
    ['Next project', 'Anthropogenic Narratives'],
    ['Previous project', 'Exhoil'],
    ['Previous project', 'Exhoil']
  ];
  var counterArr = new Array(phrasesArr.length).fill(0);

  for (let i = 0; i < textScrambleElems.length; i++) {
    const fx = new TextScramble(textScrambleElems[i]);
    fxArr.push(fx);
    next(i);
  }

  function next(index) {
    fxArr[index].setText(phrasesArr[index][counterArr[index]]).then(() => {
      setTimeout(() => next(index), 1500);
    });
    counterArr[index] = (counterArr[index] + 1) % phrasesArr[index].length;
  }
} else {
  console.log("L'elemento con classe 'text-scramble' non è stato trovato");
}