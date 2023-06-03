import { View,StyleSheet,Text,Pressable, TextInput, Button} from "react-native";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

function ModalAdd({setModalAgregarVisible, setData,data ,indice ,setIndice}){

  let elDate = new Date();
  


  const [date, setDate] = useState(elDate.toISOString().split('T')[0])
  const [visibleDatePicker, setVisibleDatePicker] = useState(false);
  


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  function onChangeName(e){
    setName(e);
  }

  function onChangePhone(e){
    
    setPhone(e);
    
  }
  function addData(){
    console.log(indice);
    let user ={'id':indice ,'nombre':name,'cel':phone,'pago':date};
    //const newUser = data.filter(item => item.cel !== user.cel);
   // console.log(user);
    setData([...data,user]);
    console.log("guarde");
    setModalAgregarVisible(false);
  }
  
  function showCalendar(){
     setVisibleDatePicker(true);
  }
  function hiddenCalendar(){
    setVisibleDatePicker(true);
 }

 const onChangeDate = (e, selectedDate) => {
  setVisibleDatePicker(false);
  selectedDate && setDate(selectedDate.toISOString().split('T')[0]);
};


  ///const [date, setDate] = useState(new Date())

  
      
    return(
        <View style={styles.modal}>
            <View style={styles.boxEdit}>
            <Text style={styles.label}>Agregar Patinador</Text>
            <Text style={styles.labelText}>Nombre</Text>
            <TextInput style={styles.textInput} onChangeText={(text) =>onChangeName(text)} />
            <Text style={styles.labelText}>Telefono</Text>
            <TextInput style={styles.textInput} onChangeText={(text) =>onChangePhone(text)}  keyboardType="numeric"/>
            <Text style={styles.labelText}>Fecha de proximo pago</Text>
            <Button title={date.toString()} onPress={showCalendar}/>
            {visibleDatePicker &&
                <DateTimePicker value={elDate} display="spinner" mode="date" format="YYYY-MM-DD"
               onChange={onChangeDate}/>
            }
           
            

            <View style={styles.row}>
              <Pressable onPress={()=>(addData())} style={[styles.buttonEditEliminar,{backgroundColor:'#40eb34'}]} android_ripple={{color: '#210644'}}>
                <Text style={{color:'white',fontWeight:'bold'}}>Agregar</Text>
              </Pressable>
              <Pressable style={[styles.buttonEditEliminar,{backgroundColor:'red'}]} android_ripple={{color: '#210644'}} onPress={setModalAgregarVisible}>
                <Text style={{color:'white',fontWeight:'bold'}}>Cancelar</Text>
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
      fontSize:18,
      lineHeight:35,
      height:35,
      

    },
    labelText:{
      color:'#620991',
      fontWeight:'bold',
      backgroundColor:'white',
      width:'90%',
      fontWeight:'bold',
      textAlign:'center',
      marginVertical: 5
    },
    textInput:{
      borderWidth:1,
      textAlign:"center",
      width:'90%'
    },
    row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        marginVertical: 5,
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

export default ModalAdd;