  // 3. Crear un joystick funcional

  const IP_ADDRESS = `http://${location.host}`
  const socket = io(IP_ADDRESS);

  socket.on('connect', () => {
    socket.emit('clientType', 'web interface');
  });

  const container = document.querySelector('.container');
  const containers = Array.from(document.querySelectorAll('.caratula-img-container'));
  const numColumns = 4;
  const numRows = 3;
  var selectedIndex = 0;
  
  // Agrega la clase 'selected' al primer elemento
  containers[selectedIndex].parentElement.classList.add('selected');
  
  function playPauseVideo() {
    const video = containers[selectedIndex].querySelector('video');
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  function jumpAhead() {
    const video = containers[selectedIndex].querySelector('video');
    video.currentTime += 10;
  }
  
  function jumpBack() {
    const video = containers[selectedIndex].querySelector('video');
    video.currentTime -= 10;
  }
  
  function toggleFullScreen() {
    const video = containers[selectedIndex].querySelector('video');
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  function volumeVideo(value){
    const video = containers[selectedIndex].querySelector('video');
    video.volume = value;
  }

  function plusTenVolume(){
    const video = containers[selectedIndex].querySelector('video');
    if (video.volume >= 1){
      console.log("No se puede subir más el volumen");
    }
    video.volume += 0.1;
  }

  function minusTenVolume(){
    const video = containers[selectedIndex].querySelector('video');
    if (video.volume <= 0){
      console.log("No se puede bajar más el volumen");
    }
    video.volume -= 0.1;
  }
  
  function updateSelection(index) {
    containers[selectedIndex].parentElement.classList.remove('selected');
    selectedIndex = index;
    containers[selectedIndex].parentElement.classList.add('selected');
  }
  
  // Hacer scroll suave hacia abajo (página completa)
  function scrollToBottomSmooth() {
    const scrollTo = document.body.scrollHeight;
    smoothScrollTo(scrollTo);
  }

  // Hacer scroll suave hacia arriba (página completa)
  function scrollToTopSmooth() {
    smoothScrollTo(0);
  }

  // Hacer scroll incremental hacia abajo
  function scrollDownIncremental() {
    const contenido = document.getElementById('contenido');
    if (!contenido) {
      return;
    }
    
    const scrollAmount = contenido.clientHeight * 0.3;
    const currentPosition = contenido.scrollTop;
    const maxScroll = contenido.scrollHeight - contenido.clientHeight;
    const newPosition = Math.min(maxScroll, currentPosition + scrollAmount);
    
    contenido.scrollTo({
      top: newPosition,
      behavior: 'smooth'
    });
  }

  // Hacer scroll incremental hacia arriba
  function scrollUpIncremental() {
    const contenido = document.getElementById('contenido');
    if (!contenido) {
      return;
    }
    
    const scrollAmount = contenido.clientHeight * 0.3;
    const currentPosition = contenido.scrollTop;
    const newPosition = Math.max(0, currentPosition - scrollAmount);
    
    contenido.scrollTo({
      top: newPosition,
      behavior: 'smooth'
    });
  }

  function smoothScrollTo(to) {
    console.log(`smoothScrollTo llamado con destino: ${to}`);
    const duration = 1000; // Duración en milisegundos
    const element = document.scrollingElement || document.documentElement;
    const start = element.scrollTop;
    const change = to - start;
    const startDate = +new Date();
    
    console.log(`Inicio: ${start}, Cambio: ${change}, Destino: ${to}`);
    console.log(`Elemento para scroll:`, element);
    console.log(`Altura total del documento:`, document.body.scrollHeight);
    console.log(`Altura de la ventana:`, window.innerHeight);

    // Animación de scroll
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    };

    const animateScroll = () => {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      const newScrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
      console.log(`Animando scroll: tiempo=${currentTime}, scrollTop=${newScrollTop}`);
      element.scrollTop = newScrollTop;
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = to;
        console.log(`Animación completada, posición final: ${element.scrollTop}`);
      }
    };

    animateScroll();
  }



//Funcion para el boton de me gusta
  function likeButton(){
  const elementos = document.querySelectorAll(".caratula")
  const elementosArray = Array.from(elementos);

      const videoselected = elementosArray.find(elem => elem.classList.contains("selected"));
      const imagenHeart = videoselected.querySelector('.fav');
        if (imagenHeart.style.display == "none") {
        imagenHeart.style.display = "block";
      }
      else {
        imagenHeart.style.display = "none";
      }
    
    }

  
  // JOYSTICK //
  socket.on('joystickAction', (action) => {
    // esta lógica funciona perfectamente para nuestra interfaz pero si se requiere escalabilidad 
    // se necesitaría generalizar el algoritmo
    switch (action) {
      case 'ArrowUp':
        if (selectedIndex >= numColumns) {
          updateSelection(selectedIndex - numColumns);
        }
        break;
      case 'ArrowDown':
        if (selectedIndex < containers.length - numColumns) {
          updateSelection(selectedIndex + numColumns);
        }
        break;
      case 'ArrowLeft':
        if (selectedIndex % numColumns !== 0) {
          updateSelection(selectedIndex - 1);
        }
        break;
      case 'ArrowRight':
        if ((selectedIndex + 1) % numColumns !== 0) {
          updateSelection(selectedIndex + 1);
        }
        break;
      case 'PlayPause':
        playPauseVideo();
        break;
      case 'ScrollUp':
        scrollUpIncremental();
        break;
      case 'ScrollDown':
        scrollDownIncremental();
        break;
    }
  });
  //Nos llega la userAction desde el servidor´
  socket.on('userAction', (action) => {
    switch (action) {
      case 'start/stop':
        playPauseVideo();
        break;
      case 'forward':
        jumpAhead();
        break;
      case 'backward':
        jumpBack();
        break;
      case 'fullScreen/exit':
        toggleFullScreen();
        break;
      case 'volumeUp':
        plusTenVolume();
        break;
      case 'volumeDown':
        minusTenVolume();
        break;
      case 'like':
        likeButton();
        break;
    }});
  // FIN DE JOYSTICK //

  //Nos llega el valor de 'videoVolume' desde el servidor
  socket.on('volumeVideo', (value) => {
    volumeVideo(value);
  });

/* Buscador */

socket.on('searchInput', (value) => {
  console.log(value);
  let search = value;
  console.log(search);
  const array = ["Equitacion","Boulder","Formula1"];
  for (let i = 0; i < array.length; i++) {
    if (array[i].substring(0, value.length).toLowerCase() !== value.toLowerCase()) {
      console.log(document.getElementById(array[i]));
      document.getElementById(array[i]).style.display = "none";
      document.getElementById("categoria-" + array[i]).style.display = "none";
      console.log(array[i]);
    } else {
      document.getElementById(array[i]).style.display = "block";
      document.getElementById("categoria-" + array[i]).style.display = "block";
    }
  }

});




  


  

  
  
    