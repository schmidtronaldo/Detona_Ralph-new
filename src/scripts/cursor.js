 
 let porrada = new Audio('./src/audios/pancada.mp3');
 porrada.volume = 0.3;
 
 
 
 //animação cursor
 let teste = document.querySelector('.panel');

 teste.addEventListener('click',()=>{
   teste.classList.add('cursor');
   porrada.play();
   setTimeout(()=>{
     teste.classList.remove('cursor');
   }, 300);
  });