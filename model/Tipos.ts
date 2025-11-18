export type Lugar = DatosFormulario & {
    id:string
}

export type Lugares = Array<Lugar>

export type DatosFormulario = {
    nombre:string
    pais:string
    ciudad:string
    foto:string
    descripcion:string
}