import { Alert, FlatList, Modal, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ItemLugar from './components/ItemLugar'
import { DatosFormulario, Lugar, Lugares } from './model/Tipos'
import { globalStyles } from './styles/GlobalStyles'
import Fab from './components/Fab'
import { borrarLugar, cargarLugares, crearNuevoLugar, modificarLugar } from './utils/CrudLugares'
import DetalleLugar from './components/DetalleLugar'
import EditorLugar from './components/EditorLugar'
import * as R from "ramda";
import BuscadorSencillo from './components/BuscadorSencillo'
import BuscadorSugerencias from './components/BuscadorSugerencias'

export default function App() {

  const [listaLugares, setListaLugares] = useState<Lugares>([])
  const [modalEditarVisible, setModalEditarVisible] = useState(false)
  useEffect( accionCargarLugares, [] )

  const [lugarSeleccionado, setLugarSeleccionado] = useState<Lugar | undefined>(undefined)

  function getItemLugar (lugar:Lugar):React.ReactElement{
    return <ItemLugar item={lugar} accionAbrirDetalleLugar={accionAbrirDetalleLugar}/>
  }

  function accionAbrirDetalleLugar(lugar: Lugar){
    setLugarSeleccionado(lugar)
  }

  function accionCerrarDetalleLugar(){
    setLugarSeleccionado(undefined)
  }

  function accionAbrirEditorLugar(lugar?: Lugar){
    setModalEditarVisible(true)
  }

  function accionCerrarEditorLugar(){
    setModalEditarVisible(false)
  }

  function accionCerrarNuevoLugar(){
    
  }

  function accionCrearNuevoLugar(datos:DatosFormulario){
    crearNuevoLugar(datos)
      .then( nuevoLugar => {
        setModalEditarVisible(false)
        const nuevaLista = R.append(nuevoLugar, listaLugares)
        setListaLugares(nuevaLista)
      })
      .catch(error => mostrarError(error.toString()))
  }

  function accionModificarLugar(datos:DatosFormulario){
    if(lugarSeleccionado!== undefined){
      modificarLugar(lugarSeleccionado.id, datos)
        .then( lugarModificado => {
          const nuevaLista = listaLugares.map(
            lugar => lugar.id===lugarModificado.id? lugarModificado : lugar
          )
          setListaLugares(nuevaLista)
          setModalEditarVisible(false)
        })
        .catch(error => mostrarError(error.toString()))
    }
  }

  function accionBorrarLugar(){
    Alert.alert(
      `¿Desea borrar ${lugarSeleccionado?.nombre}?`,
      "Un lugar eliminado no podrá ser recuperado",
      [
        {text:"Si, eliminar", onPress:realizarBorrado},
        {text:"No, cancelar"}
      ]
    )
  }

  function realizarBorrado(){
    if(lugarSeleccionado!==undefined){
      borrarLugar(lugarSeleccionado)
        .then(() => {
          const nuevaLista = R.without([lugarSeleccionado],listaLugares)
          setListaLugares(nuevaLista)
          setLugarSeleccionado(undefined)
        })
        .catch(error => mostrarError(error.toString()))
    }
  }

  function mostrarError(mensaje:string){
    Alert.alert("Error", mensaje)
  }

  function accionCargarLugares(){
    cargarLugares()
      .then( lugares => setListaLugares(lugares) )
      .catch( error => mostrarError(error.toString()) )
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Lugares del Mundo</Text>
      <BuscadorSugerencias setLugarSeleccionado={setLugarSeleccionado}/>
      <View style={{marginTop:60}}>
        <FlatList 
          data={listaLugares} 
          keyExtractor={(lugar) => lugar.id.toString()}
          renderItem={({item}) => getItemLugar(item)}
        />
      </View>
      <View style={styles.posicionFab}>
        <Fab icono={'add'} onPress={() => accionAbrirEditorLugar()} bgColor={"#007aff"}/>
      </View>
      {
        lugarSeleccionado !== undefined && (
          <Modal transparent={false} animationType={"slide"}>
            <DetalleLugar 
              lugarSeleccionado={lugarSeleccionado} 
              accionAbrirEditorLugar={accionAbrirEditorLugar} 
              accionBorrarLugar={accionBorrarLugar}
              salirPulsado={accionCerrarDetalleLugar}
            />
          </Modal>
        )
      }
      {
        modalEditarVisible && (
          <Modal transparent={false} animationType={'slide'}>
            <EditorLugar lugarSeleccionado={lugarSeleccionado} 
            aceptarPulsado={lugarSeleccionado===undefined?
              accionCrearNuevoLugar:accionModificarLugar} 
            accionCerrarEditorLugar={accionCerrarEditorLugar}/>
          </Modal>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    backgroundColor:"#f0f2f5",
  }, titulo: {
    ...globalStyles.titulo,
    color:"#344055",
    marginBottom: 16,
  }, posicionFab: {
    position:"absolute",
    bottom:64,
    right:64,
  }
})