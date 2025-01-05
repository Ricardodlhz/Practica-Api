//Vars
let containerHistorial=document.getElementById("containerHistorial")
let fragment=document.createDocumentFragment()
//Functions
const cargarHistorial=()=>{
    let historial=JSON.parse(localStorage.getItem("historial"))

    if(historial){
        let container=document.createElement("DIV")
        container.classList.add("flex","gap-8","justify-center","mt-10")
        historial.forEach(artista => {
            let newDiv=document.createElement("DIV")
            let newDivNombre=document.createElement("DIV")
            let newDivPais=document.createElement("DIV")
            let newDivGenero=document.createElement("DIV")
            newDivNombre.classList.add("flex","gap-2")
            newDivPais.classList.add("flex","gap-2")
            newDivGenero.classList.add("flex","gap-2")
            let nombre=document.createElement("P")
            nombre.textContent="Nombre:"
            let nombreArtista=document.createElement("P")
            nombreArtista.textContent=artista._nombre
            newDivNombre.append(nombre)
            newDivNombre.append(nombreArtista)

            let pais=document.createElement("P")
            pais.textContent="Pais:"
            let paisArtista=document.createElement("P")
            paisArtista.textContent=artista._pais
            newDivPais.append(pais)
            newDivPais.append(paisArtista)

            let genero=document.createElement("P")
            genero.textContent="Genero:"
            let generoArtista=document.createElement("P")
            generoArtista.textContent=artista._genero
            newDivGenero.append(genero)
            newDivGenero.append(generoArtista)
            
            newDiv.append(newDivNombre)
            newDiv.append(newDivPais)
            newDiv.append(newDivGenero)
            container.append(newDiv)
            
            fragment.append(container)
        });
        containerHistorial.append(fragment)
    }else{
        let newTitulo=document.createElement("H2")
        newTitulo.classList.add("text-white","font-[Raleway]","text-2xl","text-center")
        newTitulo.textContent="No has buscado todavia Artistas"
        fragment.append(newTitulo)
        containerHistorial.append(fragment)
    }
}

//listener
document.addEventListener("DOMContentLoaded",cargarHistorial)