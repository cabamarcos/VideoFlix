const btnStartStopRecord = document.getElementById('btnStartStopRecord');
const searchInput = document.getElementById('searchInput');
const btnPlayText = document.getElementById('playText')

let recognition = new webkitSpeechRecognition();
recognition.lang = 'es-ES'
recognition.continuous = true;
recognition.interimResults = false;

let escuchando = false;

recognition.onresult = (event) => {
  const results = event.results;
  const frase = results[results.length - 1][0].transcript;
  searchInput.value += frase;
};

recognition.onend = (event) => {
  console.log('El micrófono deja de escuchar');
};

recognition.onerror = (event) => {
  console.log(event.error);
};

btnStartStopRecord.addEventListener('click', () => {
  if (!escuchando) {
    recognition.start();
    escuchando = true;
    btnStartStopRecord.innerHTML = '<a id="borde"><image src="./images/micro_off.png"></a>';
    } else {
    recognition.abort();
    escuchando = false;
    btnStartStopRecord.innerHTML = '<a id="borde"><image src="./images/micro.png"></a>';
  }
});

btnPlayText.addEventListener('click', () => {
  leerTexto(searchInput.value);
});

function leerTexto(searchInput){
  const speech = new SpeechSynthesisUtterance();
  speech.text = searchInput;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}
