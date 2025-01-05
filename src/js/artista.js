export class Artista{
    constructor(nombre,pais,genero){
        this.nombre=nombre
        this.pais=pais
        this.genero=genero
    }


    //Getter y Setter
    get nombre(){
        return this._nombre
    }

    set nombre(nombre){
        this._nombre=nombre
    }

    get pais(){
        return this._pais
    }

    set pais(pais){
        this._pais=pais
    }

    get genero(){
        return this._genero
    }

    set genero(genero){
        this._genero=genero
    }
}