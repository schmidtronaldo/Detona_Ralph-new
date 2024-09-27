let body = document.querySelector(".panel");
//musicas do ambiente
const bgAudio = new Audio('./src/audios/swing.wav');
bgAudio.volume = 0.2;
bgAudio.muted = false;
body.addEventListener('mouseover',()=>bgAudio.play());

const gameOver = new Audio('./src/audios/gameOver.mp3');
gameOver.volume= 0.5;
//captura h1 e botao reiniciar
let titulo = document.querySelector('.titulo');

let botaoReiniciar = document.querySelector('.escondeBotaoReiniciar');

//efeitos sonoros
const sfx = [
    new Audio('./src/audios/haha.mp3'),
    new Audio('./src/audios/ohhater.mp3'),
    new Audio('./src/audios/imback.mp3'),
  ];
 
  function soundFx(index) {
    sfx.volume = 0.5;
    sfx[index].play();
  }
  soundFx(2);

//variaveis de ambiente
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
//reinicia variaveis e mensagem fim de jogo
function countDown() {
  state.values.tempo--;
  state.view.timeLeft.textContent = state.values.tempo;
  state.view.vidas.textContent = `x${state.values.atualVida}`;

  if (state.values.tempo < 1 || state.values.atualVida < 1) {
    
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

//define posiçao do personagem
function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

 
 
//eventos de click e pontuaçao
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

initialize();



  
      
  
   
  
    

  

  
  
  

 
  

  
 
  
  


  
  



