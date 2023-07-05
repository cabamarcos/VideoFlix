// Obtenemos los elementos del DOM
const videosContainer = document.getElementById('videos-container');

// Creamos la función que filtra los videos
function filterVideos() {
  // Obtenemos el input de búsqueda
  const searchInput = document.getElementById('searchInput');
  // Obtenemos el valor del input de búsqueda y lo pasamos a minúsculas
  const searchTerm = searchInput.value.toLowerCase();

  // Filtramos los videos que contengan el término de búsqueda en el título
  const filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm));

  // Creamos el HTML de los videos filtrados
  const videosHTML = filteredVideos.map(video => `
    <div class="video">
      <h3>${video.title}</h3>
      <video poster="${video.poster}" controls>
        <source src="${video.video}" type="video/mp4">
      </video>
    </div>
  `).join('');

  // Insertamos el HTML de los videos filtrados en el contenedor de videos
  videosContainer.innerHTML = videosHTML;
}
        

// Filtramos los videos por defecto al cargar la página
//filterVideos();
