
const bgAudio = new Audio('./src/audios/swing.wav');
bgAudio.volume = 0.2;
const gameOver = new Audio('./src/audios/stranger-things-124008.wav');
gameOver.volume= 0.5;

let titulo = document.querySelector('.titulo');
let botaoReiniciar = document.querySelector('.esconda');

const sfx = [
    new Audio('./src/audios/haha.mp3'),
    new Audio('./src/audios/ohhater.mp3'),
    new Audio('./src/audios/imback.mp3'),
  ];

  function soundFx(index) {
    sfx.volume = 0.5;
    sfx[index].play();
  }



const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    vidas: document.querySelector('.vidas'),
  },

  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    tempo: 60,
    atualVida: 5,
    
  },

  actions: {
    timerId: setInterval(randomSquare, 900),
    countDownTimerId: setInterval(countDown, 1000),
    
  },
}

function countDown() {
  state.values.tempo--;
  state.view.timeLeft.textContent = state.values.tempo;
  state.view.vidas.textContent = `x${state.values.atualVida}`;

  if (state.values.tempo < 1 || state.values.atualVida < 1) {
    // state.view.score.textContent = " " ;
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    bgAudio.muted = true;
   
    titulo.textContent =`Fim de Jogo! O seu resultado foi: ${state.values.result}`;
    gameOver.play();
    
//recarregar pagina
    setTimeout(()=>{ botaoReiniciar.classList.add('restart')} ,3000);

    botaoReiniciar.onclick = ()=>{
      location.reload();
   }
    
  }

  
  } 


function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

 
 

function addListenerHitBox() {
  
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition){
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        soundFx(1)
        }
      else{
        state.values.atualVida--;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        soundFx(0);  
      }
    });
  });
}

function initialize(){
  addListenerHitBox();
 
  }

  soundFx(2);
  bgAudio.play();
  initialize();

  

  
      
  
   
  
    

  

  
  
  

 
  

  
 
  
  


  
  



