# P2 sistemas interactivos y ubicuos 

# 
**Para acceder a las dos interfaces ejecutad los siguientes comandos en una terminal dentro de la carpeta:**

npm install
npm run dev

Una vez se ejecutan dichos comando aparecerán los enlaces en la terminal con los cuales pueden acceder a la web y el mando.


**Esta es una web adaptada a personas con una discapacidad intelectual**
Requisitos implementados:

- Lectura fácil en todos las páginas, incluída la política de privacidad

- Tutorial de uso de la aplicación

- Utilización de pictogramas para personas con TEA 

- Uso de patrones de Diseño de Van Duyne como breadcrums muy útiles para personas con alzheimer

- Incorporación de SpeechApi para personas con dificultad en la lectura y en la escritura (se ha incorporado un botón tanto para detectar la voz y escribir lo narrado, como para leer lo escrito)



# WEB 
La interfaz web se reproducirá en una pantalla de ordenador, televisón o proyector con la que a traves del mando se puede interactuar.
En ella encontraremos los videos de cada categoria los cuales se pueden seleccionar con el joystick del  mando. 

También encontraremos un menu a la izquierda de la pantalla en la cual si seleccionamos los difrentes titulos nos llevará directamente a la zona de videos que hemos seleccionado.

Además en la esquina superior izquierda encontramos la página de contacto de la empresa y la política de privacidad. 

Esta página es responsive aunque no está pensada para ser utilizada en un dispositivo móvil o tablet. 


# MANDO
Por su parte, en el mando, encontramos el buscador para poder filtrar los videos de la pantalla del ordenador,el botón de play/pause, un joystick para navegar por los vídeos de la terminal y 
tres botones, una interrogación que nos lleva al tutorial o página de ayuda y un botón de like para darle me gusta a los vídeos. 

El primero de los botones sirve para detectar la voz y escribir lo escuchado. Una vez se ha pulsado, se puede empezar a hablar. Se debe esperar uno o dos segundos para que procese lo escuchado y lo escriba en la terminal. Espere unos segundos para esta acción. 

El segundo botón sirve para leer lo escrito dentro de la barra de búsqueda. Una vez escrito en la barra de búsqueda hay que dar a enter para que que busque.

El tercer botón sirve para poder acceder a otra de las pantallas del mando en la cual controlamos todas las funcionalidades del video y volumen, se puede realizar de forma tactil(explicado en el icono de pregunta de la pagina principal del mando) o a traves de los botones que estan en la misma página.

    Acciones de volumen (delimitas en el 80% de la pantalla dejando un margen del 10% arriba y 10% abajo para que no interfiera con los botones)

    - Para subir el volumen se requiere arrastrar el dedo de manera vertical de abajo a arriba (la acción se ejecuta en un rango del 0% al 100% de unidad en unidad)
    - Para bajar el volumen se requiere arrastrar el dedo de manera vertical de arriba a abajo (la acción se ejecuta en un rango del 0% al 100% de unidad en unidad)

    - También hemos implementado unos botones que realizan la misma acción (subir el volumen  en un rango del 0% al 100% en unidades de 10)

    Acciones de play pause

    - Si pulsas en cualquier parte de la pantalla una vez se para (si está en marcha el video) o se pone en marcha (si está parado)
    
    - Existe un botón implementado con su respectivo icono que realiza la misma acción


    Acciones de adelantar/atrasar el vídeo 

    - Si pulsas dos veces a la derecha adelantas el vídeo 10 segundos
    - Si pulsas dos veces a la izquierda atrasas el vídeo 10 segundos

    - Existe dos botones implementados con su respectivo icono que realizan la misma acción

    Acciones de full screen/exit full screen 

    - Si pulsas dos veces en el centro haces full screen o exit full screen
    - Existe un botón implementado con su respectivo icono que realiza la misma acción en la esquina superior derecha


En la página de ayuda o tutorial se ofrece una explicación detallada de cómo se usa la interfaz móvil. 

El joystick está pensado para desplazarse por una pantalla de ordenador de cualquier tamaño o cualquier pantalla más grande. Si se utiliza en una pantalla de ipad o móvil podría no funcionar correctamente. 

En Search cuando haces una búsqueda aparecen los vídeos en una sola columna, si se quiere volver al estado inicial con 4 columnas, recargar la pagina.

La funcionalidad de full screen, en replit funciona perfectamente como se puede comprobar en el siguiente enlace: https://replit.com/@cabamarcos/Touch-FullScreenAPI. Ahora bien, en VSC a veces da algunos problemas y hay que hacer click varias veces para que se haga la pantalla completa. 

Cabe recalcar que para poder reproducir los vídeos, tenemos que iniciarlos primero en el ordenador tocar la pantalla en cualquier parte (en el hipotético caso de que aun así no se reproduzca, dar play y pause desde la pantalla del ordenador en el vídeo), ya que el navegador no nos deja iniciar los videos desde el movil si no hemos interaccionado primero en la web.




# Resumen
En el desarrollo de nuestro prototipo HiFi hemos sido fieles a nuestro diseño:
Hemos implementado la interfaz con un joystick tal y como propusimos en la fase de diseño 
y más importante, hemos creado una interfaz adaptada para personas con discapacidad intelectual. 
Acompañamos todas nuestras explicaciones mediante, iconos, toda la página está hecha en lectura fácil 
y hemos incorporado la API speech para personas con dificultad en la escritura.