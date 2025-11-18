import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Lugar } from '../model/Tipos'
import { Image } from 'expo-image'

type VisorSugerenciaProps = {
    lugar:Lugar
}

export default function VisorSugerencia({lugar}:VisorSugerenciaProps) {
  return (
    <View style={styles.contenedor}>
        <Image source={lugar.foto} style={styles.foto}/>
        <View>
            <Text style={styles.nombre}>{lugar.nombre}</Text>
            <Text style={styles.detalle}>{lugar.ciudad}, {lugar.pais}</Text>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:12,
        paddingVertical:8,
        borderBottomColor:"#ddd",
        backgroundColor:"#fff"
    }, detalle: {
        fontSize:14,
        color:"#666",
        marginTop:2,
    }, nombre: {
        fontSize:16,
        fontWeight:"600",
        color:"#222",
    }, foto: {
        width:48,
        height:48,
        borderRadius:8,
        marginRight:12,
    }
})