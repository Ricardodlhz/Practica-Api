//Apis keys
const ticketMasterApiKey="T6MA2HQ4qpcEsWlYWKr8MR3Ux9mDOMQ4"
//Vars
let llamarModal=document.getElementById("llamarModal")
let ventanaModal=document.getElementById("modal")
let main=document.getElementById("containerConciertos")
let containerDeportes=document.getElementById("containerDeportes")
let valueArtista=document.getElementById("nombreArtista")
let enviar=document.getElementById("enviar")
let cerrar=document.getElementById("cerrar")
let img=document.getElementById("img")
let rayitasModal=document.getElementById("rayitasModal")
//Functions

//Funcion para recoger la información de los eventos que dará un artista introducido por parametro.
const peticionApiTicketMasterArtista=async(nombreArtista)=>{
    //Para recogerlo por nombre
    const api=await fetch(`https://app.ticketmaster.com/discovery/v2/events?keyword=${nombreArtista}&apikey=`+ticketMasterApiKey)
    const data=await api.json()
    return data
}


//Funcion para recoger la información de los eventos que se van a dar en Madrid de la segunda página.
const peticionApiTicketMasterGeneral=async()=>{
    const api=await fetch(`https://app.ticketmaster.com/discovery/v2/events?city=Madrid&page=2&apikey=`+ticketMasterApiKey)
    const data=await api.json()
    return data
}
//Función para Recoger la informacion de los eventos deportivos
const peticionApiTicketMasterDeportes=async()=>{
    const api=await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?segmentId=KZFzniwnSyZfZ7v7nE&apikey=`+ticketMasterApiKey)
    const data=await api.json()
    return data
}



//Función para crear los elementos con la información de la api
let fragment=document.createDocumentFragment()
const crearElementos=(evento)=>{
    let newArticle=document.createElement("ARTICLE")
    let newTitulo=document.createElement("H2")
    let newImg=document.createElement("IMG")
    let newA=document.createElement("A")
    let newP=document.createElement("P")
    newArticle.classList.add("cards")
    newImg.classList.add("imagen")
    newTitulo.classList.add("titulo")
    newA.classList.add("texto")
    newP.classList.add("texto")
    newTitulo.textContent=evento.name
    newImg.src=evento.images[4].url
    newA.textContent="Comprar Entradas"
    newA.href=evento.url
    newA.target="_blank"
    newP.textContent="Fecha del Evento: "+evento.dates.start.localDate
    newArticle.append(newTitulo)
    newArticle.append(newImg)
    newArticle.append(newA)
    newArticle.append(newP)
    return fragment.appendChild(newArticle)
}
//Función para cargar los eventos en el index.html
const listarEventosIndex=async()=>{
    
    const cargaIndex=await peticionApiTicketMasterGeneral()
    const arrayEventos=cargaIndex._embedded.events
    const cargarDeportes=await peticionApiTicketMasterDeportes()
    const arrayEventosDeportes=cargarDeportes._embedded.events
    //Mostramos los Eventos de Musica en Madrid
    for (let evento = 0; evento < 5; evento++) {
       main.append(crearElementos(arrayEventos[evento]))
    }
    
    //  console.log(cargaIndex)
    // console.log(cargarDeportes)
    //Mostramos los Eventos de Deportes
    for (let evento = 0; evento < 5; evento++) {
        containerDeportes.append(crearElementos(arrayEventosDeportes[evento]))
     }
}


//Función para hacer aparecer la ventana modal
const llamarventanaModal=(event)=>{
    if(event.target.nodeName=="I"){
        console.log("Hiciste click en la lupa")
        ventanaModal.style.display="flex"
    }
}

/*Funcion para cerrar la ventana modal */
const cerrarModal=(event)=>{
    if(event.target.nodeName=="BUTTON"){
        ventanaModal.style.display="none"
    }
}

//Guardamos en el localStorage el artista buscando para posteriormente recogerlo en la página que vamos a acceder
const buscarArtista=(event)=>{
    let nomArtista=valueArtista.value
    if(event.target.nodeName=="BUTTON"){
        localStorage.setItem("artista",JSON.stringify(nomArtista))
    }
   
}
//Listeners
document.addEventListener("DOMContentLoaded",listarEventosIndex)
llamarModal.addEventListener("click",llamarventanaModal)
rayitasModal.addEventListener("click",llamarventanaModal)
cerrar.addEventListener("click",cerrarModal)
enviar.addEventListener("click",buscarArtista)