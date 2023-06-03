import { StatusBar } from 'expo-status-bar';
import { useState ,useEffect} from 'react';
import { StyleSheet, Text, View,Image, Pressable, FlatList,Modal,Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalEdit from './components/ModalEdit';
import ModalAdd from './components/ModalAdd';






export default function App() {

  const [pantallaPrincipal,setPantallaPrincipal] = useState(false);
  const [patinadorParaEditar,setPatinadorParaEditar] = useState([]);
  const [modalEditarVisible,setModalEditarVisible] = useState(false);
  const [modalAgregarVisible,setModalAgregarVisible] = useState(false);
  const [data,setData] = useState([]);
  const [indice,setIndice] = useState(1);
  

  


  useEffect(() =>{
    console.log("hola")
    getData();
  },[])

  useEffect(() =>{
    storeData();
  },[data])

  //console.log(data);


  
  
 

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('clientes',JSON.stringify(data));
      setIndice(indice + 1);
      console.log(...data);
      //console.log(parsedData.value + " guarde ");
    } catch (error) {
       console.log(error)
    }
  };


  const getData = async () => {
    try {
      //removeData();
      //setData([]);
      //await AsyncStorage.clear();
      const value = await AsyncStorage.getItem('clientes');
      //const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        //console.log(JSON.parse(value));
        let cargarArray = JSON.parse(value);
        //console.log(...value);
        //let ee =Object.keys(cargarArray).length;
       // console.log(cargarArray[cargarArray.length-1] + " hello");
        setData(cargarArray);
        //setData(value)
      } else{

          setIndice(1);
      }

    } catch (error) {
      console.log(error);
    }
  };


  const removeData = async (i) => {
   
  //const newArray = data.splice(i,1);
   //setData([newArray]);
  // await AsyncStorage.clear();
  
   const newArray = data.filter(item => item.id !== i);
    setData(newArray);
   /*try {
      await AsyncStorage.setItem('clientes',JSON.stringify(newArray));
      const value = await AsyncStorage.getItem('clientes');
      setData(JSON.parse(value));
      //setData([])
    } catch (error) {
      // Handle error
      console.log(eror);
    }*/
  };



  function editUser( user ){
    setPatinadorParaEditar(user)
    setModalEditarVisible(true);
  }

  function addUser() {
    setModalAgregarVisible(true);
  }

  function closeModal(){
    setModalEditarVisible(false);
  }

  function closeModalAdd(){
    console.log('entre')
    setModalAgregarVisible(false);
  }
  console.log(patinadorParaEditar);

  const DATA = [
    /*{
      nombre:'Eduardo Ramos',
      cel:'3113629316',
      pago:'27-02-23'
    },
    {
      nombre:'EDUARDO RAMOS',
      cel:'3113629317',
      pago:'27-02-23'
    },
    {
      nombre:'EDUARDO RAMOS',
      cel:'3113629318',
      pago:'27-02-23'
    },
    {
      nombre:'EDUARDO RAMOS',
      cel:'3113629319',
      pago:'27-02-23'
    },
    {
      nombre:'EDUARDO RAMOS',
      cel:'3113629320',
      pago:'27-02-23'
    },
    {
      nombre:'EDUARDO RAMOS',
      cel:'3113629340',
      pago:'27-02-23'
    },
    {
      nombre:'EDUARDO RAMOS',
      cel:'3113629321',
      pago:'27-02-23'
    },*/

  ]

  if(!pantallaPrincipal){

    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image source={require('./assets/images/sr.png')} style={{ width: '100%', height: 300 }}/>
        <Pressable style={styles.button} android_ripple={{color: '#210644'}} onPress={()=>{setPantallaPrincipal(true)}}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </View>
    );
  }

  else if(pantallaPrincipal){
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Pressable style={styles.usersTitle}  onPress={()=>{console.log("worls")}}>
          <Text style={styles.buttonText}>Patinadores </Text>
        </Pressable>

        <FlatList data={data}
          style={styles.tableroUsuarios}
          keyExtractor={item=> item.id}
          //extraData={selectedId}
          renderItem={({item}) => 
          <Pressable style={styles.userProfile}  key={item.id} >
            <View style={styles.row}>
              <Text style={styles.label}>Nombre</Text>
              <Text>{item.nombre}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Tel</Text>
              <Text>{item.cel}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Pago Hasta</Text>
              <Text>{item.pago}</Text>
            </View>
            <View style={styles.row}>
              <Pressable onPress={()=>(editUser(item))} style={[styles.buttonEditEliminar,{backgroundColor:'#40eb34'}]} android_ripple={{color: '#210644'}}>
                <Text style={{color:'white',fontWeight:'bold'}}>Editar</Text>
              </Pressable>
              <Pressable onPress={()=>(removeData(item.id))} style={[styles.buttonEditEliminar,{backgroundColor:'red'}]} android_ripple={{color: '#210644'}}>
                <Text style={{color:'white',fontWeight:'bold'}}>Eliminar</Text>
              </Pressable>
            </View>
          </Pressable>}/>
          <Pressable style={styles.button } android_ripple={{color: '#210644'}} onPress={()=>{console.log("worls")}}>
          <Text style={styles.buttonText} onPress={()=>{addUser()}}>Agregar </Text>
        </Pressable>
        {
          modalEditarVisible &&
          <ModalEdit user={patinadorParaEditar} setModalEditarVisible={ closeModal} />
        }

        {
          modalAgregarVisible &&
          <ModalAdd setModalAgregarVisible={closeModalAdd} setData={setData} data={data} storeData={storeData} indice ={indice} setIndice={setIndice} />
        }
        
        
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:'#620991',
    width:'80%',
    height:35,
    borderRadius:35,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10
  },
  buttonText:{
    color:'white',
    fontSize:20,
  },
  usersTitle:{
    backgroundColor:'#620991',
    width:'90%',
    height:35,
    justifyContent:'center',
    alignItems:'center',
    marginTop:10,
    borderWidth:1,
    borderColor:'white',
    marginTop:30
  },
  tableroUsuarios:{
    backgroundColor:'black',
    width:'90%',
    borderWidth:1,
    borderColor:'white',
  },
  userProfile:{
    width:'95%',
    backgroundColor:'white',
    marginTop:5,
    marginHorizontal:5,
    padding:10,
    borderRadius:6,
  },
  row:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  label:{
    color:'#620991',
    fontWeight:'bold'
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

});
