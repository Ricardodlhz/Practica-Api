//Apis keys
const ticketMasterApiKey="T6MA2HQ4qpcEsWlYWKr8MR3Ux9mDOMQ4"
//Vars
let llamarModal=document.getElementById("llamarModal")
let main=document.getElementById("main")
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
//Función para mostrar los datos por pantalla de la api
let fragment=document.createDocumentFragment()
const listarEventoArtista=async(event)=>{
    if(event.target.nodeName=="BUTTON"){
        let nombreArtista=artista.value
        const info=await peticionApiTicketMasterArtista(nombreArtista)
        console.log(info._embedded.events)
        const itunes=await peticionItunes(info._embedded.events[0].name)
        console.log(itunes)
    }
}

//Función para crear los elementos del index
const crearElementos=(evento)=>{
    let newArticle=document.createElement("ARTICLE")
    let newTitulo=document.createElement("H2")
    let newImg=document.createElement("IMG")
    let newA=document.createElement("A")
    let newP=document.createElement("P")
    newArticle.classList.add("cards")
    newImg.classList.add("imagen")
    newTitulo.textContent=evento.name
    newImg.src=evento.images[2].url
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
//Función para cargar los eventos de Madrid en el index.html
const listarEventosIndex=async()=>{
    
    const cargaIndex=await peticionApiTicketMasterGeneral()
    const arrayEventos=cargaIndex._embedded.events
    arrayEventos.forEach(evento => {
       crearElementos(evento)
    })
    
    
}
//Función para hacer aparecer la ventana modal
const ventanaModal=(event)=>{

}

//Listeners
document.addEventListener("DOMContentLoaded",listarEventosIndex)
llamarModal.addEventListener("click",ventanaModal)