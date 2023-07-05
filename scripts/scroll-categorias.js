function scrollToCategoria(id) {
    const categoriaElement = document.getElementById(id);
  
    if (categoriaElement) {
      categoriaElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  function home() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function categoria(index) {
    const ids = [
      'categoria-Boulder',
      'categoria-Equitacion',
      'categoria-Formula1',
    ];
  
    if (ids[index]) {
      scrollToCategoria(ids[index]);
    }
  }