
import { TouchableOpacity, Text, View, Alert } from 'react-native';
import styles from "../../styles/styles.js";
import * as React from 'react';
import Input from './Inputs/Input';
import { useState } from "react";
//import Button from './Forms/Inputs/Button';
/*
Form to add new client
props:
  buildClient={BuildClientHandler}
  onClick={setActiveIndex}
*/
const FormAddClient = (props) => {
  let isActive = props.onActive;
  if (isActive !== 3) return;
  //inputValues State set for every input values in the form
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    address: '',
    tel: '',
    note: '',
  });
  //function to replace old value for new one after a change
  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  //Function to handle the form submissions
  //in:client object
  const onSubmit = () => {
    //Validate inputs
    if ((inputValues.name === "") || (inputValues.email === "") || (inputValues.address === "")) {
      Alert.alert("Erro", "Os campos do Nome, Email e endereço sao obrigatorios");
      //break submit
      return;
    };
    if(!(inputValues.email.includes("@") && inputValues.email.includes("mail") && inputValues.email.includes(".com"))){
      Alert.alert("Erro", "Há algum erro no campo do email. Por favor verifique e tente novamente.");
      //break submit
      return;
    };

    let tel = inputValues.tel.replace(/[().-\s]/g,'');
    if((typeof tel !== 'number' && isNaN(tel))){
      Alert.alert("Erro", "Um numero de contato é obrigatorio");
      //break submit
      return;
    };
    tel = parseInt(tel);
    if(tel < 100000000){
      Alert.alert("Erro", "Parece que esta faltando algum numero");
      //break submit
      return;
    };
    
    let key = true;
    let clientList = props.clientList;
    for (let i = 0; i < clientList?.length; i++) {
      if (props.clientList[i]?.email === inputValues.email) {
        Alert.alert("Erro", "Este email já existe");
        //break submit
        key = false;
      }
      else if (props.clientList[i]?.name === inputValues.name) {
        Alert.alert("Erro", "Este nome já existe");
        //break submit
        key = false;
      }
    }
    if (key) {
      //Build client
      props.buildClient(inputValues);
      //Reset inputs
      handleCancel();
    }
  }
  //Function to handle the Cancel button 
  //it erases the input fields
  //and set the active component to Clients menu.
  function handleCancel() {
    //Reset Inputs
    inputValues.name = '';
    inputValues.email = '';
    inputValues.address = '';
    inputValues.tel = '';
    inputValues.note = '';
    //Set active index
    props.onClick(1);
  };



  return (
    <>

      {/*view form. Englobes all */}
      <View style={styles.form}>
        <Text style={styles.title}>Adicionar cliente</Text>
        {/*each field has its own view row  */}
        <View style={[styles.formRow, {gap:"3%"}]}>
          <Input
            style={{flex: 1}}
            label="Nome"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'name'),
              value: inputValues.name,
              maxLength: 20,
            }}
          />
          <Input
            style={{flex: 1}}
            label="Contato"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'tel'),
              value: inputValues.tel,
              keyboardType: 'phone-pad',
              maxLength: 20
            }}
          />
        </View>
        <View style={styles.formRow}>
          <Input
            label="Email"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'email'),
              value: inputValues.email,
              keyboardType: 'email-address',
              placeholder: "email@mail.com"

            }}
          />
        </View>
        <View style={styles.formRow}>

          <Input
            label="Endereço do cliente"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'address'),
              value: inputValues.address,
              multiline: true,
              maxLength: 90,
              numberOfLines:2,
            }}
          />
        </View>

        <View style={styles.formRow}>
          <Input
            label="Nota"
            textInputConfig={{
              onChangeText: inputChangedHandler.bind(this, 'note'),
              value: inputValues.note,
              multiline: true,
              maxLength: 150,
              numberOfLines:4,
              placeholder: "Insira alguma nota sobre este cliente"
            }}
          />

        </View>
        <View style={styles.formButtons}>
          <TouchableOpacity
            style={styles.btnForm}
            onPress={handleCancel}
          >
            <Text style={styles.btnText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnForm}
            onPress={onSubmit}
          >
            <Text style={styles.btnText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

      </View>
    </>
  );
}

export default FormAddClient;
