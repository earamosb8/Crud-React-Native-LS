import { useState } from "react";
import { View,StyleSheet,Text,Button, TextInput ,Pressable} from "react-native";




function ModalEdit({user,setModalEditarVisible}){
  
  const [changeName, setChangeName] = useState(user.nombre);

  function onChangeName(e){
    setChangeName("")
    setChangeName(e)
  }

    
      
    return(
        <View style={styles.modal}>
           
            <View style={styles.boxEdit}>
            <Text style={styles.label}>Editar Datos</Text>
                <Text style={styles.labelText}>Nombre</Text>
                <TextInput style={styles.textInput} 
                  value={changeName}
                  onChangeText={(text) =>onChangeName(text)}/>
                <Text style={styles.labelText}>Telefono</Text>
                <Text style={styles.textInput}>{user.cel}</Text>
                <Text style={styles.labelText}>Fecha de pago</Text>
                <TextInput style={styles.textInput}  value={user.pago}/>
                <View style={styles.row}>
                <Pressable onPress={()=>(editUser(item))} style={[styles.buttonEditEliminar,{backgroundColor:'#40eb34'}]} android_ripple={{color: '#210644'}}>
                  <Text style={{color:'white',fontWeight:'bold'}}>Editar</Text>
                </Pressable>
                <Pressable onPress={()=>(removeData(item.id))} style={[styles.buttonEditEliminar,{backgroundColor:'red'}]} android_ripple={{color: '#210644'}}>
                  <Text style={{color:'white',fontWeight:'bold'}}>Eliminar</Text>
                </Pressable>
              </View>
            </View>
           
        </View>
    );

}


const styles = StyleSheet.create({
    modal:{
        flex:1,
        position:'absolute',
        width:'100%',
        height:'100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    boxEdit:{
        justifyContent:'center',
        alignItems:'center',
        width:'95%',
        backgroundColor:'white',
        marginTop:5,
        marginHorizontal:5,
       
        borderRadius:6,
        opacity:1,
      
    },
    label:{
      color:'white',
      fontWeight:'bold',
      backgroundColor:'#620991',
      width:'100%',
      fontWeight:'bold',
      textAlign:'center',
      fontSize:18
    },
    labelText:{
      color:'#620991',
      fontWeight:'bold',
      backgroundColor:'white',
      width:'90%',
      fontWeight:'bold',
      textAlign:'center'
    },
    textInput:{
      borderWidth:1,
      textAlign:"center",
      width:'90%'
    },
    buttonEditEliminar:{
      backgroundColor:'green',
      width: '30%',
      height:30,
      marginTop:4,
      borderRadius:5,
      justifyContent:'center',
      alignItems:'center'
    }
})

export default ModalEdit;