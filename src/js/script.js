//Apis keys
const ticketMasterApiKey="T6MA2HQ4qpcEsWlYWKr8MR3Ux9mDOMQ4"
//Vars
let llamarModal=document.getElementById("llamarModal")
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
const listar=async(event)=>{
    const cargaIndex=await peticionApiTicketMasterGeneral()
    console.log(cargaIndex)
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
document.addEventListener("DOMContentLoaded",listar)
llamarModal.addEventListener("click",ventanaModal)