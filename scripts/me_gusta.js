let userAction;

const likeButton = document.getElementById('like-button');

// Cuando se hace clic en el botón "Me gusta"
likeButton.addEventListener('click', function() {
  userAction = 'like';
  // Enviar un mensaje al servidor para cambiar el color del corazón
  console.log(userAction);
  // Cuando se recibe un mensaje del servidor para cambiar el color del corazón
  socket.emit('userAction', userAction); 
});
  