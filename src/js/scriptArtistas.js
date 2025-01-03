//Vars
let tituloArtista=document.getElementById("tituloArtista")
let containerInformacion=document.getElementById("containerInformacion")  
//Functions
//Funcion que nos devuelve información de la api de Itunes.
const peticionItunes=async(nombreArtista)=>{
    const api=await fetch(" https://itunes.apple.com/search?term="+nombreArtista)
    const data =await api.json()
    return data
}

let fragment=document.createDocumentFragment()
const cargartituloArtista=async()=>{
    let nombre=JSON.parse(localStorage.getItem("artista"))
    tituloArtista.textContent=nombre
   let itunes=await peticionItunes(nombre)
   let informacion=itunes.results
  
    for (let index = 0; index < 12; index++) {
        let newDiv=document.createElement("DIV")
        newDiv.classList.add("flex","items-center","flex-col","justify-center","gap-4")
        let newTitulo=document.createElement("H2")
        let newAudio=document.createElement("AUDIO")
        let newImg=document.createElement("IMG")
        newImg.classList.add("w-[150px]")
        newAudio.controls=true
        newTitulo.classList.add("text-white")
        newTitulo.textContent=informacion[index].trackName
        newImg.src=informacion[index].artworkUrl100
        newAudio.src=informacion[index].previewUrl
        newDiv.append(newTitulo)
        newDiv.append(newImg)
        newDiv.append(newAudio)

        fragment.append(newDiv)
    }
    console.log(itunes.results)
    containerInformacion.append(fragment)
}

//Listener
document.addEventListener("DOMContentLoaded",cargartituloArtista)