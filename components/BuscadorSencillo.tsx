import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../styles/GlobalStyles'
import { buscarLugares } from '../utils/CrudLugares'
import { Lugares } from '../model/Tipos'

type BuscadorSencilloProps = {
    setListaLugares: React.Dispatch<React.SetStateAction<Lugares>>
}

export default function BuscadorSencillo({setListaLugares}:BuscadorSencilloProps) {

    const [textoBusqueda, setTextoBusqueda] = useState("")
    useEffect(accionBuscarLugares, [textoBusqueda])

    function accionBuscarLugares(){
        buscarLugares(textoBusqueda)
            .then(lugares => setListaLugares(lugares))
            .catch(error => console.log(error.toString()))
    }

    return (
        <TextInput 
            style={globalStyles.buscador}
            placeholder={'Búsqueda por nombre, país, descripción...'}
            value={textoBusqueda}
            onChangeText={setTextoBusqueda}
        />
    )
}

const styles = StyleSheet.create({})