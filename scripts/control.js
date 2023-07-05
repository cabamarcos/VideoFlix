const IP_ADDRESS = `http://${location.host}`
const socket = io(IP_ADDRESS);
let lastTap = 0;
let tapCount = 0;
let userAction;
let startStopTimer;
const centerY = window.innerHeight / 2;
const allowedRange = centerY * 0.7;


document.addEventListener('touchstart', (event) => {
  const currentTime = new Date().getTime();

  if (event.touches.length === 1) {
    // Single tap
    const touchY = event.touches[0].pageY;
    const touchInAllowedRange = Math.abs(touchY - centerY) <= allowedRange;

    if(touchInAllowedRange){
      if (currentTime - lastTap < 250) {
        // Double tap
        tapCount++;
  
        if (tapCount === 2) {
          tapCount = 0;
  
          const x = event.touches[0].pageX;
          const width = window.innerWidth;
          const third = width / 3;
  
          if (x > 2 * third) {
            console.log('forward');
            userAction = 'forward';
            //enviamos al servidor la acción del usuario
            socket.emit('userAction', userAction);
          } else if (x > third) {
            console.log('fullScreen/exit');
            userAction = 'fullScreen/exit';
            socket.emit('userAction', userAction);
          } else {
            console.log('backward');
            userAction = 'backward';
            socket.emit('userAction', userAction);
          }
  
          // Reiniciamos el temporizador si se produce un doble toque
          clearTimeout(startStopTimer);
  
        }
      } else {
        touchMoved = false; // reiniciar variable
        tapCount = 1;
        lastTap = currentTime;
  
        // Establecemos el temporizador antes de imprimir la acción start/stop
        startStopTimer = setTimeout(() => {
          if (tapCount === 1 && !touchMoved) {// si no se ha movido el dedo
            console.log('start/stop');
            userAction = 'start/stop';
            socket.emit('userAction', userAction);
          }
        }, 250);
      }
    }
  }
});

document.addEventListener('touchmove', (event) => {
  touchMoved = true; // marcar que se movió el dedo
  const y = event.touches[0].pageY;
  const height = window.innerHeight;
  const onePercent = height / 100;
  const volume = Math.round((y / onePercent)); // calcular el volumen basado en la posición del dedo
  let volumeVideo;
  const touchY = event.touches[0].pageY;
  const touchInAllowedRange = Math.abs(touchY - centerY) <= allowedRange;

  if(touchInAllowedRange){
    if (volume <= 0) { 
      console.log('Volumen máximo');
      volumeVideo = 1;
      //enviamos al servidor el volumen del usuario
      socket.emit('volumeVideo', volumeVideo);
    } else if (volume >= 100) {
      console.log('Silenciado');
      volumeVideo = 0;
      socket.emit('volumeVideo', volumeVideo);
    } else {
      volumeVideo = (100 - volume) / 100;
      socket.emit('volumeVideo', volumeVideo);
    }
  }
});

// Botones
// Seleccionar los botones en el DOM
const fullButton = document.getElementById("full");
const volDownButton = document.getElementById("volDown");
const atrasarButton = document.getElementById("atrasar");
const playButton = document.getElementById("play");
const adelantarButton = document.getElementById("adelantar");
const volUpButton = document.getElementById("volUp");

// Añadir los eventos de click a los botones
fullButton.addEventListener("click", () => {
  userAction = 'fullScreen/exit';
  console.log(userAction);
  socket.emit('userAction', userAction);
});

volDownButton.addEventListener("click", () => {
  userAction = 'volumeDown';
  console.log(userAction);
  socket.emit('userAction', userAction);
});

atrasarButton.addEventListener("click", () => {
  userAction = 'backward';
  console.log(userAction);
  socket.emit('userAction', userAction);
});

playButton.addEventListener("click", () => {
  userAction = 'start/stop';
  console.log(userAction);
  socket.emit('userAction', userAction);
});

adelantarButton.addEventListener("click", () => {
  userAction = 'forward';
  console.log(userAction);
  socket.emit('userAction', userAction);
});

volUpButton.addEventListener("click", () => {
  userAction = 'volumeUp';
  console.log(userAction);
  socket.emit('userAction', userAction);
});