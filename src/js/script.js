//Apis keys
const ticketMasterApiKey="T6MA2HQ4qpcEsWlYWKr8MR3Ux9mDOMQ4"
//Variables
let artista=document.getElementById("artista")
let enviar=document.getElementById("enviar")
//Para recogerlo por id la imagen
// const api=await fetch("https://app.ticketmaster.com/discovery/v2/events/Z698xZ8KZ17uko9/images?apikey="+ticketMasterApiKey)

//Funciones

const peticionApiTicketMaster=async(nombreArtista)=>{
    //Para recogerlo por nombre
    const api=await fetch(`https://app.ticketmaster.com/discovery/v2/events?keyword=${nombreArtista}&apikey=`+ticketMasterApiKey)
    const data=await api.json()
    return data
}
const peticionItunes=async(nombreArtista)=>{
    const api=await fetch(" https://itunes.apple.com/search?term="+nombreArtista)
    const data =await api.json()
    return data
}
const listar=async()=>{
    let nombreArtista=artista.value
    const info=await peticionApiTicketMaster(nombreArtista)
    console.log(info._embedded.events)
    const itunes=await peticionItunes(info._embedded.events[0].name)
    console.log(itunes)
}


//Listener
enviar.addEventListener("click",listar)
enviar.addEventListener("DOMContentLoaded",listar)