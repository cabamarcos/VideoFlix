let menu = document.getElementById("movil");
if (menu === null) {
    console.log("No hay menú");
    let menu2 = document.getElementById("movil_user");
    menu=menu2;
}
menu.addEventListener("click", function(e){
    let enlaces = document.getElementById("enlaces-movil");

// console.log(enlaces.style.display)
if(enlaces.style.display === "block"){
    enlaces.style.display = "none";
}else{
    enlaces.style.display = "block";
}
});