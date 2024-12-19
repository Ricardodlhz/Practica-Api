//Apis keys
const ticketMasterApiKey="T6MA2HQ4qpcEsWlYWKr8MR3Ux9mDOMQ4"
//Vars
let llamarModal=document.getElementById("llamarModal")
let main=document.getElementById("containerConciertos")
let img=document.getElementById("img")
//Take images by id
// const api=await fetch("https://app.ticketmaster.com/discovery/v2/events/Z698xZ8KZ17uko9/images?apikey="+ticketMasterApiKey)

//Function

//Funcion para recoger la información de los eventos que dará un artista introducido por parametro.
const peticionApiTicketMasterArtista=async(nombreArtista)=>{
    //Para recogerlo por nombre
    const api=await fetch(`https://app.ticketmaster.com/discovery/v2/events?keyword=${nombreArtista}&apikey=`+ticketMasterApiKey)
    const data=await api.json()
    return data
}
//Funcion que nos devuelve información de la api de Itunes.
const peticionItunes=async(nombreArtista)=>{
    const api=await fetch(" https://itunes.apple.com/search?term="+nombreArtista)
    const data =await api.json()
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
    fragment.appendChild(newArticle)
    main.appendChild(fragment)
}
//Función para cargar los eventos en el index.html
const listarEventosIndex=async()=>{
    
    const cargaIndex=await peticionApiTicketMasterGeneral()
    const arrayEventos=cargaIndex._embedded.events
    const cargarDeportes=await peticionApiTicketMasterDeportes()
    const arrayEventosDeportes=cargarDeportes._embedded.events
    //Mostramos los Eventos de Musica en Madrid
    for (let evento = 0; evento < 5; evento++) {
       crearElementos(arrayEventos[evento])
    }
    
    //  console.log(cargaIndex)
    console.log(cargarDeportes)
    //Mostramos los Eventos de Deportes
    for (let evento = 0; evento < 5; evento++) {
        crearElementos(arrayEventosDeportes[evento])
     }
}

//Función para mostrar los datos por pantalla de la api de un artisto en concreto
const listarEventoArtista=async(event)=>{
    if(event.target.nodeName=="BUTTON"){
        let nombreArtista=artista.value
        const info=await peticionApiTicketMasterArtista(nombreArtista)
        console.log(info._embedded.events)
        const itunes=await peticionItunes(info._embedded.events[0].name)
        console.log(itunes)
    }
}
//Función para hacer aparecer la ventana modal
const ventanaModal=(event)=>{

}

//Listeners
document.addEventListener("DOMContentLoaded",listarEventosIndex)
llamarModal.addEventListener("click",ventanaModal)