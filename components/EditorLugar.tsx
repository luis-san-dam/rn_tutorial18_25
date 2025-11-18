import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { DatosFormulario, Lugar } from '../model/Tipos'
import { globalStyles } from '../styles/GlobalStyles'
import { Image } from 'expo-image'
import Boton from './Boton'

type EditorLugarProps = {
    lugarSeleccionado?: Lugar
    aceptarPulsado:(datos: DatosFormulario) => void
    accionCerrarEditorLugar:() => void
}



export default function EditorLugar({lugarSeleccionado, aceptarPulsado, accionCerrarEditorLugar}:EditorLugarProps) {
    const [nombre, setNombre] = useState(lugarSeleccionado?.nombre ?? "")
    const [pais, setPais] = useState(lugarSeleccionado?.pais ?? "")
    const [ciudad, setCiudad] = useState(lugarSeleccionado?.ciudad ?? "")
    const [foto, setFoto] = useState(lugarSeleccionado?.foto ?? "")
    const [descripcion, setDescripcion] = useState(lugarSeleccionado?.descripcion ?? "")

    function getDatosFormulario():DatosFormulario{
      return{nombre,pais,ciudad,foto,descripcion}
    }

    const titulo = lugarSeleccionado === undefined ? "Nuevo Lugar" : lugarSeleccionado.nombre
    return (
    <ScrollView contentContainerStyle={{flexGrow:1}}>
      <View style={styles.contenedor}>
        <Text style={globalStyles.titulo}>
          {titulo}
        </Text>
        <Image 
          style={globalStyles.foto}
          contentFit='cover'
          source={foto}
        />
        <TextInput style={styles.areaTexto} placeholder={"Nombre del lugar"} value={nombre} onChangeText={setNombre}/>
        <TextInput style={styles.areaTexto} placeholder={"País"} value={pais} onChangeText={setPais} />
        <TextInput style={styles.areaTexto} placeholder={"Ciudad"} value={ciudad} onChangeText={setCiudad} />
        <TextInput style={styles.areaTexto} placeholder={"Url de la foto"} value={foto} onChangeText={setFoto} />
        <TextInput style={styles.areaTexto} placeholder={"Descripción"} value={descripcion} onChangeText={setDescripcion} multiline={true}/>
        <View style={styles.contenedorBotones}>
          <Boton texto={"Aceptar"} onPress={() => aceptarPulsado(getDatosFormulario())}/>
          <Boton texto={"Cancelar"} onPress={accionCerrarEditorLugar}/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    backgroundColor:"#F3F4F6",
    rowGap:20,
  }, areaTexto: {
    ...globalStyles.cuadroTexto,
    textAlignVertical: "top",
    height:100,
  }, contenedorBotones: {
    flex:1,
    justifyContent: "flex-end",
    rowGap:20,
  }
})